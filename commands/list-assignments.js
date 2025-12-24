const { SlashCommandBuilder } = require('discord.js');
const db = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('list-assignments')
    .setDescription('List all assignments for this server'),

  async execute(interaction) {
    const guildId = interaction.guildId;

    // Query assignments for this server
    db.all(
      `SELECT assignment_name, course_name, due_date, created_at 
       FROM assignments 
       WHERE guild_id = ? 
       ORDER BY created_at ASC`,
      [guildId],
      async (err, rows) => {
        if (err) {
          console.error(err.message);
          return interaction.reply({ content: ' Failed to fetch assignments.', ephemeral: true });
        }

        if (!rows || rows.length === 0) {
          return interaction.reply(' No assignments found for this server.');
        }

        // Format the assignments nicely
        let message = ' **Assignments for this server:**\n\n';
        rows.forEach((row, index) => {
          message += `**${index + 1}. ${row.assignment_name}**\n`;
          message += `Course: ${row.course_name}\n`;
          message += `Due: ${row.due_date}\n`;
          message += `Added: ${row.created_at}\n\n`;
        });

        // Reply in Discord
        await interaction.reply(message);
      }
    );
  }
};
