const { SlashCommandBuilder } = require('discord.js');
const path = require('path');

// path to the .gif
const attatchmentPath = path.join(__dirname, '..', '..', 'attachments')

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
            if (heads) await interaction.reply({ content:message, files: [`${attatchmentPath}/coin_flip_heads.gif`]});
            else await interaction.reply({ content:message, files: [`${attatchmentPath}/coin_flip_tails.gif`]});
        },
};
