#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

const JOKES_FILE = path.join(__dirname, 'jokes.json');

// Load jokes from file
function loadJokes() {
  if (!fs.existsSync(JOKES_FILE)) {
    return { jokes: [] };
  }
  const data = fs.readFileSync(JOKES_FILE, 'utf-8');
  return JSON.parse(data);
}

// Save jokes to file
function saveJokes(data) {
  fs.writeFileSync(JOKES_FILE, JSON.stringify(data, null, 2));
}

// Get random joke
function getRandomJoke() {
  const data = loadJokes();
  if (data.jokes.length === 0) {
    console.log(chalk.yellow('No jokes available yet!'));
    return;
  }
  const joke = data.jokes[Math.floor(Math.random() * data.jokes.length)];
  console.log(chalk.cyan('\n' + joke.text));
  console.log(chalk.gray(`Category: ${joke.category} | Author: ${joke.author}\n`));
}

// List all jokes
function listJokes() {
  const data = loadJokes();
  if (data.jokes.length === 0) {
    console.log(chalk.yellow('No jokes available yet!'));
    return;
  }
  console.log(chalk.blue('\n📚 All Jokes:\n'));
  data.jokes.forEach((joke, index) => {
    console.log(chalk.white(`${index + 1}. ${joke.text}`));
    console.log(chalk.gray(`   Category: ${joke.category} | Author: ${joke.author}\n`));
  });
}

// Submit a new joke
async function submitJoke() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter your joke:',
      validate: (input) => input.trim().length > 0 || 'Joke cannot be empty!'
    },
    {
      type: 'list',
      name: 'category',
      message: 'Select a category:',
      choices: ['puns', 'science', 'programming', 'knock-knock', 'other']
    },
    {
      type: 'input',
      name: 'author',
      message: 'Enter your name (or press Enter for anonymous):',
      default: 'anonymous'
    }
  ]);

  const data = loadJokes();
  const newJoke = {
    id: data.jokes.length > 0 ? Math.max(...data.jokes.map(j => j.id)) + 1 : 1,
    text: answers.text,
    category: answers.category,
    author: answers.author || 'anonymous'
  };

  data.jokes.push(newJoke);
  saveJokes(data);
  console.log(chalk.green('\n✅ Joke submitted successfully!\n'));
}

// Get jokes by category
async function jokesByCategory() {
  const data = loadJokes();
  const categories = [...new Set(data.jokes.map(j => j.category))];

  if (categories.length === 0) {
    console.log(chalk.yellow('No jokes available yet!'));
    return;
  }

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'category',
      message: 'Select a category:',
      choices: categories
    }
  ]);

  const jokes = data.jokes.filter(j => j.category === answers.category);
  console.log(chalk.blue(`\n📂 ${answers.category.toUpperCase()} Jokes:\n`));
  jokes.forEach((joke, index) => {
    console.log(chalk.white(`${index + 1}. ${joke.text}`));
    console.log(chalk.gray(`   Author: ${joke.author}\n`));
  });
}

// Delete a joke
async function deleteJoke() {
  const data = loadJokes();
  if (data.jokes.length === 0) {
    console.log(chalk.yellow('No jokes to delete!'));
    return;
  }

  const choices = data.jokes.map((joke, index) => ({
    name: `${index + 1}. ${joke.text}`,
    value: joke.id
  }));

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'id',
      message: 'Select a joke to delete:',
      choices
    }
  ]);

  data.jokes = data.jokes.filter(j => j.id !== answers.id);
  saveJokes(data);
  console.log(chalk.green('\n✅ Joke deleted successfully!\n'));
}

// Main menu
async function main() {
  console.log(chalk.bold.yellow('\n😂 Welcome to Joke App!\n'));

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        { name: 'Get a random joke', value: 'random' },
        { name: 'List all jokes', value: 'list' },
        { name: 'Get jokes by category', value: 'category' },
        { name: 'Submit a new joke', value: 'submit' },
        { name: 'Delete a joke', value: 'delete' },
        { name: 'Exit', value: 'exit' }
      ]
    }
  ]);

  switch (answers.action) {
    case 'random':
      getRandomJoke();
      break;
    case 'list':
      listJokes();
      break;
    case 'category':
      await jokesByCategory();
      break;
    case 'submit':
      await submitJoke();
      break;
    case 'delete':
      await deleteJoke();
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
