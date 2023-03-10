const { Events } = require('discord.js');

const prefix = '!';

module.exports = {
    name: Events.MessageCreate,
    async function(message) {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();
        console.log(command);
        if (command === 'coin') client.commands.get('coin').execute();
    },
};