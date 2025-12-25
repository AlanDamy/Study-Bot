# Study Bot 📚

Study Bot is a Discord study helper bot that allows students to track assignments and notes using slash commands and persistent storage.

---

## Features
- Add assignments using slash commands
- View assignments for the current Discord server
- Add and view notes for each assignment
- Persistent storage using SQLite (data remains after bot restarts)
- Server-specific data (each Discord server has its own assignments)

---

## Tech Stack
- Node.js
- Discord.js
- SQLite
- Git & GitHub

---

## How It Works
- Slash commands are registered using Discord’s application commands API
- Assignment data is stored locally in a SQLite database
- Each assignment is associated with a Discord server (guild)
- Environment variables are used to keep sensitive tokens secure

---

## Getting Started

### Prerequisites
- Node.js installed
- A Discord bot token

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Study-Bot.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file in the project root:
   ```bash
   BOT_TOKEN=your_discord_bot_token
   CLIENT_ID=your_client_id
   ```
   

4. Start the bot:
   ```bash
   npm start
   ```

## Future Improvements
- Automated reminders before assignment due dates
- Course-based study groups and role management
- Improved error handling and permissions