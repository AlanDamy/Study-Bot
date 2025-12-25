const { SlashCommandBuilder } = require('discord.js');
const db = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('add-notes')
    .setDescription('Add notes to an assignment')
    .addIntegerOption(option =>
      option
        .setName('assignment_id')
        .setDescription('ID of the assignment')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('notes')
        .setDescription('Notes to attach')
        .setRequired(true)
    ),

  async execute(interaction) {
    const assignmentId = interaction.options.getInteger('assignment_id');
    const notes = interaction.options.getString('notes');
    const guildId = interaction.guildId;

    db.run(
      `UPDATE assignments 
       SET notes = ? 
       WHERE assignment_id = ? AND guild_id = ?`,
      [notes, assignmentId, guildId],
      function (err) {
        if (err) {
          console.error(err.message);
          return interaction.reply({ content: '❌ Failed to add notes.', ephemeral: true });
        }

        if (this.changes === 0) {
          return interaction.reply({ content: '⚠️ Assignment not found.', ephemeral: true });
        }

        interaction.reply('📝 Notes saved successfully!');
      }
    );
  }
};
