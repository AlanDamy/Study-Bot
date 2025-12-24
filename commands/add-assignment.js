const {SlashCommandBuilder} = require('discord.js');

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

    if(!global.assignments){
        global.assignments = [];
    }

    const guildId = interaction.guildId;
    if(!global.assignments[guildId]){
        global.assignments[guildId] = [];
    }

    global.assignments[guildId].push({
        course: course,
        name: name,
        dueDate: dueDate
    });

    await interaction.reply(`Assignment "${name}" for course "${course}" due on "${dueDate}" has been added.`);
    },
};