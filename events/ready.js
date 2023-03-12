const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(bot) {
        require('../handlers/CommandHandler')(bot);
    },
};