const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-assignment')
        .setDescription('Adds a new assignment')
        .addStringOption(option => 
            option.setName('Course')
                .setDescription('Course name: ')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('Name')
                .setDescription('Assignment name: ')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('Due_Date')
                .setDescription('Due date: ')
                .setRequired(true)),
    async execute(interaction) {
        const course = interaction.options.getString('Course');
        const name = interaction.options.getString('Name');
        const dueDate = interaction.options.getString('Due_Date');

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