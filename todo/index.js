#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

const TODOS_FILE = path.join(__dirname, 'todos.json');

// Load todos from file
function loadTodos() {
  if (!fs.existsSync(TODOS_FILE)) {
    return { todos: [] };
  }
  const data = fs.readFileSync(TODOS_FILE, 'utf-8');
  return JSON.parse(data);
}

// Save todos to file
function saveTodos(data) {
  fs.writeFileSync(TODOS_FILE, JSON.stringify(data, null, 2));
}

// Add a new todo
async function addTodo() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter task title:',
      validate: (input) => input.trim().length > 0 || 'Task cannot be empty!'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter task description (optional):',
      default: ''
    },
    {
      type: 'list',
      name: 'priority',
      message: 'Set priority:',
      choices: ['Low', 'Medium', 'High']
    }
  ]);

  const data = loadTodos();
  const newTodo = {
    id: data.todos.length > 0 ? Math.max(...data.todos.map(t => t.id)) + 1 : 1,
    title: answers.title,
    description: answers.description,
    priority: answers.priority,
    completed: false,
    createdAt: new Date().toISOString(),
    completedAt: null
  };

  data.todos.push(newTodo);
  saveTodos(data);
  console.log(chalk.green('\n✅ Task added successfully!\n'));
}

// View all todos
function viewAllTodos() {
  const data = loadTodos();
  if (data.todos.length === 0) {
    console.log(chalk.yellow('\n📭 No tasks yet!\n'));
    return;
  }

  console.log(chalk.blue('\n📋 All Tasks:\n'));
  data.todos.forEach((todo) => {
    const status = todo.completed ? chalk.green('✓ DONE') : chalk.yellow('⏳ PENDING');
    const priorityColor = todo.priority === 'High' ? chalk.red : todo.priority === 'Medium' ? chalk.yellow : chalk.gray;
    const id = chalk.cyan(`[${todo.id}]`);
    
    console.log(`${id} ${status} - ${todo.title}`);
    if (todo.description) {
      console.log(chalk.gray(`   Description: ${todo.description}`));
    }
    console.log(priorityColor(`   Priority: ${todo.priority}`));
    console.log(chalk.gray(`   Created: ${new Date(todo.createdAt).toLocaleDateString()}\n`));
  });
}

// View pending todos only
function viewPendingTodos() {
  const data = loadTodos();
  const pending = data.todos.filter(t => !t.completed);

  if (pending.length === 0) {
    console.log(chalk.green('\n🎉 All tasks completed!\n'));
    return;
  }

  console.log(chalk.blue('\n⏳ Pending Tasks:\n'));
  pending.forEach((todo) => {
    const priorityColor = todo.priority === 'High' ? chalk.red : todo.priority === 'Medium' ? chalk.yellow : chalk.gray;
    const id = chalk.cyan(`[${todo.id}]`);
    
    console.log(`${id} ${todo.title}`);
    if (todo.description) {
      console.log(chalk.gray(`   Description: ${todo.description}`));
    }
    console.log(priorityColor(`   Priority: ${todo.priority}\n`));
  });
}

// View completed todos only
function viewCompletedTodos() {
  const data = loadTodos();
  const completed = data.todos.filter(t => t.completed);

  if (completed.length === 0) {
    console.log(chalk.yellow('\n📭 No completed tasks yet!\n'));
    return;
  }

  console.log(chalk.green('\n✅ Completed Tasks:\n'));
  completed.forEach((todo) => {
    const id = chalk.cyan(`[${todo.id}]`);
    const completedDate = new Date(todo.completedAt).toLocaleDateString();
    
    console.log(`${id} ${todo.title}`);
    console.log(chalk.gray(`   Completed: ${completedDate}\n`));
  });
}

// Mark todo as complete
async function completeTodo() {
  const data = loadTodos();
  const pending = data.todos.filter(t => !t.completed);

  if (pending.length === 0) {
    console.log(chalk.green('\n🎉 All tasks are already completed!\n'));
    return;
  }

  const choices = pending.map((todo) => ({
    name: `${todo.title} (${todo.priority} priority)`,
    value: todo.id
  }));

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'id',
      message: 'Select a task to mark as complete:',
      choices
    }
  ]);

  const todo = data.todos.find(t => t.id === answers.id);
  todo.completed = true;
  todo.completedAt = new Date().toISOString();
  saveTodos(data);
  console.log(chalk.green('\n✅ Task marked as complete!\n'));
}

// Delete a todo
async function deleteTodo() {
  const data = loadTodos();
  if (data.todos.length === 0) {
    console.log(chalk.yellow('\n📭 No tasks to delete!\n'));
    return;
  }

  const choices = data.todos.map((todo) => ({
    name: `${todo.completed ? '✓' : '⏳'} ${todo.title}`,
    value: todo.id
  }));

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'id',
      message: 'Select a task to delete:',
      choices
    }
  ]);

  data.todos = data.todos.filter(t => t.id !== answers.id);
  saveTodos(data);
  console.log(chalk.green('\n✅ Task deleted!\n'));
}

// Get statistics
function getStats() {
  const data = loadTodos();
  const total = data.todos.length;
  const completed = data.todos.filter(t => t.completed).length;
  const pending = total - completed;
  const high = data.todos.filter(t => t.priority === 'High' && !t.completed).length;

  console.log(chalk.cyan('\n📊 Task Statistics:\n'));
  console.log(`${chalk.blue('Total Tasks:')} ${total}`);
  console.log(`${chalk.green('Completed:')} ${completed}`);
  console.log(`${chalk.yellow('Pending:')} ${pending}`);
  console.log(`${chalk.red('High Priority (Pending):')} ${high}`);
  console.log(`${chalk.cyan('Completion Rate:')} ${total === 0 ? '0%' : ((completed / total) * 100).toFixed(1)}%\n`);
}

// Main menu
async function main() {
  console.log(chalk.bold.cyan('\n✅ Welcome to To-Do List App!\n'));

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        { name: 'Add a new task', value: 'add' },
        { name: 'View all tasks', value: 'viewAll' },
        { name: 'View pending tasks', value: 'pending' },
        { name: 'View completed tasks', value: 'completed' },
        { name: 'Mark task as complete', value: 'complete' },
        { name: 'Delete a task', value: 'delete' },
        { name: 'View statistics', value: 'stats' },
        { name: 'Exit', value: 'exit' }
      ]
    }
  ]);

  switch (answers.action) {
    case 'add':
      await addTodo();
      break;
    case 'viewAll':
      viewAllTodos();
      break;
    case 'pending':
      viewPendingTodos();
      break;
    case 'completed':
      viewCompletedTodos();
      break;
    case 'complete':
      await completeTodo();
      break;
    case 'delete':
      await deleteTodo();
      break;
    case 'stats':
      getStats();
      break;
    case 'exit':
      console.log(chalk.cyan('\nGoodbye! 👋\n'));
      process.exit(0);
  }

  // Ask if user wants to continue
  const continueApp = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'continue',
      message: 'Do you want to continue?',
      default: true
    }
  ]);

  if (continueApp.continue) {
    await main();
  } else {
    console.log(chalk.cyan('\nGoodbye! 👋\n'));
  }
}

// Run the app
main().catch(error => {
  console.error(chalk.red('Error:', error.message));
  process.exit(1);
});
