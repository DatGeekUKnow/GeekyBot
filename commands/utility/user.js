const { SlashCommandBuilder }= require('discord.js');
const { ownerId } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Provides information about the user.'),
    async execute(interaction) {
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild
        if (interaction.user.id == ownerId)  await interaction.reply({ content: `This command was run by the bot owner!, who joined on ${interaction.member.joinedAt}.`, ephemeral: true });

        await interaction.reply({ content: `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`, ephemeral: true });
    },
};