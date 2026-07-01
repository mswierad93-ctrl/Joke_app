# 📋 To-Do List App

A CLI-based to-do list application with local storage functionality. Manage your tasks efficiently with priorities, descriptions, and completion tracking.

## Features

- ✨ **Add Tasks** - Create new tasks with title, description, and priority level
- 📚 **View All Tasks** - Display all tasks with their details
- ⏳ **View Pending Tasks** - Show only incomplete tasks
- ✅ **View Completed Tasks** - Show only completed tasks
- ☑️ **Mark as Complete** - Mark tasks as done with timestamp
- 🗑️ **Delete Tasks** - Remove tasks from your list
- 📊 **View Statistics** - Get overview of your task completion rate
- 💾 **Local Storage** - All tasks are saved to `todos.json`
- 🎨 **Colorful Output** - Beautiful CLI with colored text and icons

## Priority Levels

- 🔴 **High** - Urgent tasks (shown in red)
- 🟡 **Medium** - Important tasks (shown in yellow)
- 🟢 **Low** - General tasks (shown in gray)

## Installation

1. Navigate to the todo directory:
```bash
cd todo
```

2. Install dependencies:
```bash
npm install
```

3. Run the app:
```bash
npm start
```

Or directly with:
```bash
node index.js
```

## Usage

When you run the app, you'll see a menu with these options:

1. **Add a new task** - Create a new task with title, description, and priority
2. **View all tasks** - Display all tasks with full details
3. **View pending tasks** - Show only incomplete tasks
4. **View completed tasks** - Show only finished tasks
5. **Mark task as complete** - Mark a pending task as done
6. **Delete a task** - Remove a task from your list
7. **View statistics** - See task completion statistics
8. **Exit** - Close the application

## Data Storage

All tasks are stored in `todos.json` in a structured JSON format:

```json
{
  "todos": [
    {
      "id": 1,
      "title": "Learn Node.js",
      "description": "Complete a Node.js tutorial",
      "priority": "High",
      "completed": false,
      "createdAt": "2026-07-01T00:00:00.000Z",
      "completedAt": null
    }
  ]
}
```

## Task Properties

- **id** - Unique identifier for each task
- **title** - Task name (required)
- **description** - Detailed description (optional)
- **priority** - Task priority level (Low, Medium, High)
- **completed** - Boolean flag for completion status
- **createdAt** - Timestamp when task was created
- **completedAt** - Timestamp when task was marked complete

## Statistics

The app tracks:
- Total number of tasks
- Number of completed tasks
- Number of pending tasks
- Number of high-priority pending tasks
- Overall completion rate (percentage)

## Dependencies

- `chalk` - For colorful terminal output
- `inquirer` - For interactive CLI prompts

## License

MIT

## Tips

- Tasks with **High priority** are highlighted in red for quick identification
- Completion timestamps help you track when you finished tasks
- Use the statistics view to monitor your productivity
- All data persists between sessions in `todos.json`

## Author

Created by mswierad93-ctrl
