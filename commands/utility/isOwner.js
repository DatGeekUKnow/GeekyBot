const { SlashCommandBuilder }= require('discord.js');
const { ownerId } = require('../../config.json');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('isowner')
    .setDescription('Replies whether or not the sender is the bot owner'),
    async execute(interaction) {
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild
        if (interaction.user.id === ownerId) await interaction.reply({ content: `Yes! You are the server owner Geek!`, ephemeral: true });
        else await interaction.reply({ content: `Haha! You wish you created me ;)`, ephemeral: true });
    },
};