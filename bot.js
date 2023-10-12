const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { Player } = require("discord-player");
const Logger = require('./modules/Logger');
const Embeds = require('./modules/Embeds');


// Create a new client instance
const bot = new Client({ intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates
    ] 
});

bot.logger = Logger;
bot.say = Embeds;


bot.player = new Player(bot, {
    leaveOnEnd: true,
    leaveOnStop: true,
    leaveOnEmpty: true,
    leaveOnEmptyCooldown: 60000,
    autoSelfDeaf: true,
    initialVolume: 25
});

require("./handlers/EventHandler")(bot);

// Log in to Discord with your client's token
bot.login(token);