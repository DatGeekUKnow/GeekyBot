const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
        async execute(interaction) {
            try{
                
                // send blank embed immediately, so the interaction doesn't expire
                const embed1 = interaction.client.say.baseEmbed(interaction).setDescription("Pinging...");
            
                await interaction.reply({ ephemeral: true, embeds: [embed1] }).catch(console.error);
            
                const embed2 = interaction.client.say.baseEmbed(interaction)
                .setTitle("🏓 Pong")
                .setDescription(`💓: ${Math.round(interaction.client.ws.ping)} ms
                ⏱️: ${Date.now() - interaction.createdTimestamp} ms`);
            
                //update embed now that ping has been calculated
                return interaction.editReply({ embeds: [embed2] });
            } catch (e) {
                console.log(e)
            }
        }
};