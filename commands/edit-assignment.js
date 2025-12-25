const { SlashCommandBuilder } = require('discord.js');
const db = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('edit-assignment')
    .setDescription('Edit an existing assignment')
    .addStringOption(option =>
      option
        .setName('name')
        .setDescription('Current name of the assignment to edit')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('new_name')
        .setDescription('New assignment name')
        .setRequired(false)
    )
    .addStringOption(option =>
      option
        .setName('course')
        .setDescription('New course name')
        .setRequired(false)
    )
    .addStringOption(option =>
      option
        .setName('due')
        .setDescription('New due date')
        .setRequired(false)
    )
    .addStringOption(option =>
      option
        .setName('notes')
        .setDescription('New notes')
        .setRequired(false)
    ),

  async execute(interaction) {
    const guildId = interaction.guildId;
    const name = interaction.options.getString('name');
    const newName = interaction.options.getString('new_name');
    const newCourse = interaction.options.getString('course');
    const newDue = interaction.options.getString('due');
    const newNotes = interaction.options.getString('notes');

    // Build the SET clause dynamically
    const updates = [];
    const values = [];

    if (newName) {
      updates.push('assignment_name = ?');
      values.push(newName);
    }
    if (newCourse) {
      updates.push('course_name = ?');
      values.push(newCourse);
    }
    if (newDue) {
      updates.push('due_date = ?');
      values.push(newDue);
    }
    if (newNotes) {
      updates.push('notes = ?');
      values.push(newNotes);
    }

    if (updates.length === 0) {
      return interaction.reply({ content: '⚠️ No changes provided.', ephemeral: true });
    }

    values.push(guildId, name); // guild_id and assignment_name for WHERE clause

    const sql = `UPDATE assignments SET ${updates.join(', ')} WHERE guild_id = ? AND assignment_name = ?`;

    db.run(sql, values, function(err) {
      if (err) {
        console.error(err.message);
        return interaction.reply({ content: '❌ Failed to edit assignment.', ephemeral: true });
      }

      if (this.changes === 0) {
        return interaction.reply({ content: `⚠️ No assignment named "${name}" found.`, ephemeral: true });
      }

      interaction.reply(`✅ Assignment "${name}" has been updated.`);
    });
  }
};
