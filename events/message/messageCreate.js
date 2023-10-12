const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.channel.id != "1081736919274233896") return; // only listen to the #bot channel in Geek Server
        //if (message.member.user.id == "415297088134316042") return; // ignore messages the bot sends

        //message.reply(message.embeds);
    },
};