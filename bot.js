const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const Logger = require('./modules/Logger');


// Create a new client instance
const bot = new Client({ intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages
    ] 
});

bot.commands = new Collection();

bot.logger = Logger;

require("./handlers/EventHandler")(bot);

// Log in to Discord with your client's token
bot.login(token);