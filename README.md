# 😂 Joke App

A simple CLI tool for managing and sharing jokes. Submit your own jokes, browse by category, and get random laughs!

## Features

- ✨ **Get Random Joke** - Display a random joke from the collection
- 📚 **List All Jokes** - View all available jokes
- 📂 **Browse by Category** - Filter jokes by category
- ➕ **Submit Jokes** - Add your own jokes to the collection
- 🗑️ **Delete Jokes** - Remove jokes you no longer want
- 🎨 **Colorful Output** - Beautiful CLI with colored text

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mswierad93-ctrl/Joke_app.git
cd Joke_app
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

1. **Get a random joke** - Shows a random joke from your collection
2. **List all jokes** - Displays all jokes with their categories and authors
3. **Get jokes by category** - Filters and shows jokes from a specific category
4. **Submit a new joke** - Allows you to add your own joke to the collection
5. **Delete a joke** - Remove a joke from the collection
6. **Exit** - Close the app

## Categories

Currently supported categories:
- `puns` - Pun-based jokes
- `science` - Science jokes
- `programming` - Programming jokes
- `knock-knock` - Knock-knock jokes
- `other` - Miscellaneous jokes

You can add more categories when submitting a joke by modifying the list in the code.

## Data Storage

All jokes are stored in `jokes.json` in a simple JSON format:

```json
{
  "jokes": [
    {
      "id": 1,
      "text": "Why don't scientists trust atoms? Because they make up everything!",
      "category": "science",
      "author": "system"
    }
  ]
}
```

## Dependencies

- `chalk` - For colorful terminal output
- `inquirer` - For interactive CLI prompts

## License

MIT

## Contributing

Feel free to fork this repository and submit pull requests with improvements!

## Author

Created by mswierad93-ctrl
