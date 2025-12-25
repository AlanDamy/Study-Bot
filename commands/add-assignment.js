const { SlashCommandBuilder } = require('discord.js');
const db = require('../database'); // SQLite connection

module.exports = {
  data: new SlashCommandBuilder()
    .setName('add-assignment')
    .setDescription('Add a new assignment')
    .addStringOption(option =>
      option 
        .setName('name')
        .setDescription('Assignment name')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('course')
        .setDescription('Course name')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('due')
        .setDescription('Due date')
        .setRequired(true)
    ),

  async execute(interaction) {
    const name = interaction.options.getString('name');
    const course = interaction.options.getString('course');
    const due = interaction.options.getString('due');

    const createdAt = new Date().toISOString();

    db.run(
      `INSERT INTO assignments (guild_id, course_name, assignment_name, due_date, notes, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [interaction.guildId, course, name, due, '', createdAt],
      (err) => {
        if (err) {
          console.error(err.message);
          return interaction.reply({ content: ' Failed to add assignment.', ephemeral: true });
        }
      }
    );

    await interaction.reply(
      ` Assignment **${name}** for course **${course}** due **${due}** has been saved!`
    );
  }
};
