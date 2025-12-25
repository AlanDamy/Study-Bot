const { SlashCommandBuilder } = require('discord.js');
const db = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('delete-assignment')
    .setDescription('Delete an assignment by name')
    .addStringOption(option =>
      option
        .setName('name')
        .setDescription('Name of the assignment to delete')
        .setRequired(true)
    ),

  async execute(interaction) {
    const name = interaction.options.getString('name');
    const guildId = interaction.guildId;

    db.run(
      `DELETE FROM assignments WHERE guild_id = ? AND assignment_name = ?`,
      [guildId, name],
      function(err) {
        if (err) {
          console.error(err.message);
          return interaction.reply({ content: '❌ Failed to delete assignment.', ephemeral: true });
        }

        if (this.changes === 0) {
          return interaction.reply({ content: `⚠️ No assignment named "${name}" found.`, ephemeral: true });
        }

        interaction.reply(`✅ Assignment "${name}" has been deleted.`);
      }
    );
  }
};
