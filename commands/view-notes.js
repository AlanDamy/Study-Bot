const { SlashCommandBuilder } = require('discord.js');
const db = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('view-notes')
    .setDescription('View notes for an assignment')
    .addIntegerOption(option =>
      option
        .setName('assignment_id')
        .setDescription('ID of the assignment')
        .setRequired(true)
    ),

  async execute(interaction) {
    const assignmentId = interaction.options.getInteger('assignment_id');
    const guildId = interaction.guildId;

    db.get(
      `SELECT assignment_name, notes 
       FROM assignments 
       WHERE assignment_id = ? AND guild_id = ?`,
      [assignmentId, guildId],
      (err, row) => {
        if (err) {
          console.error(err.message);
          return interaction.reply({ content: '❌ Failed to retrieve notes.', ephemeral: true });
        }

        if (!row) {
          return interaction.reply({ content: '⚠️ Assignment not found.', ephemeral: true });
        }

        if (!row.notes || row.notes.trim() === '') {
          return interaction.reply('📭 No notes saved for this assignment.');
        }

        interaction.reply(
          `📝 **Notes for ${row.assignment_name}:**\n\n${row.notes}`
        );
      }
    );
  }
};
