const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coin')
        .setDescription('Poketch coin flip!')
        .addStringOption(option =>
                option
                .setName('message')
                .setDescription('Message to attach the coin flip')
                .setRequired(false)),
        async execute(interaction) {
            let message = interaction.options.getString('message');
            let heads = Math.random() < 0.5;
            if (heads) await interaction.reply({ content:message, files: ['./attachments/coin_flip_heads.gif']});
            else await interaction.reply({ content:message, files: ['./attachments/coin_flip_tails.gif']});
        },
};
