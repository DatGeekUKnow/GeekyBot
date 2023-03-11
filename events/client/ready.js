const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(bot) {
        // initialize commands
        require("../../handler/CommandHandler")(bot);
        
        console.log(`Ready! Logged in as ${bot.user.tag}`);
    },
};