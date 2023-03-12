const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const bot = new Client({ intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages
    ] 
});

bot.commands = new Collection();

require("./handlers/EventHandler")(bot);

// Log in to Discord with your client's token
bot.login(token);