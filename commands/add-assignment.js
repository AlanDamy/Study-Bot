const {SlashCommandBuilder} = require('discord.js');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'assignments.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-assignment')
        .setDescription('Adds a new assignment')
        .addStringOption(option => 
            option.setName('course')
                .setDescription('Course name: ')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('name')
                .setDescription('Assignment name: ')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('due_date')
                .setDescription('Due date: ')
                .setRequired(true)),
    async execute(interaction) {
        const course = interaction.options.getString('course');
        const name = interaction.options.getString('name');
        const dueDate = interaction.options.getString('due_date');

        let assignments = [];
        if(fs.existsSync(dataPath)){
            assignments = JSON.parse(fs.readFileSync(dataPath));
        }

        assignments.push({course, name, dueDate,
            addedBy: interaction.user.username,
            createdAt: new Date().toISOString()
        });

        fs.writeFileSync(dataPath, JSON.stringify(assignments, null, 2));

    await interaction.reply(`Assignment "${name}" for course "${course}" due on "${dueDate}" has been added.`);
    },
};