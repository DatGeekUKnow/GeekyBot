const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coin')
        .setDescription('Poketch coin flip!'),
        async execute(interaction) {
            let heads = Math.random() < 0.5;
            if (heads) await interaction.reply({ files: ['./attachments/coin_flip_heads.gif']});
            else await interaction.reply({ files: ['./attachments/coin_flip_tails.gif']});
        },
};