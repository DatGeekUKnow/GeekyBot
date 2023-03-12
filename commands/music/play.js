const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song or playlist by name/url')
        .addStringOption(option =>
                option
                .setName('song')
                .setDescription('Name/url of song to play')
                .setRequired(true)),
        async execute(interaction) {
            try {

                const song = interaction.options.getString('song');
                const guildQueue = interaction.client.player.nodes.get(interaction.guildId);
                const channel = interaction.member?.voice?.channel;
    
                if (!channel) {
                    return interaction.client.say.warnMessage(interaction, "You have to join a voice channel first.");
                }
    
                if (guildQueue) {
                    if (channel.id !== interaction.guild.me?.voice?.channelId)
                    return interaction.client.say.warnMessage(interaction, "I'm already playing in a different voice channel.");
                } else {
                    if (!channel.viewable)
                        return interaction.client.say.warnMessage(interaction, "I need **\`VIEW_CHANNEL\`** permission.");
                    if (!channel.joinable)
                        return interaction.client.say.warnMessage(interaction, "I need **\`CONNECT_CHANNEL\`** permission");
                    if (!channel.speakable)
                        return interaction.client.say.warnMessage(interaction, "I need **\`SPEAK\`** permission");
                    if (channel.full)
                        return interaction.client.say.warnMessage(interaction, "Can't join, the voice channel is full.");
                }
    
                let result = await interaction.client.player.search(song, { requestedBy: interaction.user }).catch(() => { });
                if (!result || !result.tracks.length)
                    return interaction.client.bot.say.errorMessage(interaction, `No result was found for \`${song}\`.`);
    
                let queue;
                if (guildQueue) {
                    queue = guildQueue;
                    queue.metadata = interaction;
                } else {
                    queue = await interaction.client.player.play(channel.id, result, {
                        nodeOptions: {
                            metadata: {
                                channel: interaction.channel,
                                client: interaction.guild.members.me,
                                requestedBy: interaction.user
                            }
                        }
                    });
                }
    
                interaction.client.player.nodes.get(interaction.guildId).addTrack(result);
    
            } catch (e) {
                interaction.client.say.errorMessage(interaction, e);
                console.log(e);
            }
        }
};