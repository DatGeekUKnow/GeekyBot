const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const Logger = require("./modules/Logger");
const Embeds = require("./modules/Embeds");


// Create a new client instance
const bot = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates
    ],
    allowedMentions: { parse: ["roles", "users"], repliedUser: false} 
});


// load in all command files
bot.commands = new Collection();

bot.logger = Logger;
bot.say = Embeds;

require("./handler/EventHandler")(bot);

// Log in to Discord with your client's token
bot.login(token);
