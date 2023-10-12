const path = require('node:path');
const Util = require('../modules/Util');
const { Collection } = require('discord.js');

module.exports = function loadEvents(bot) {

    bot.commands = new Collection();

    // load in all command files

    const commandsPath = path.join(__dirname.substring(0, __dirname.lastIndexOf('/')), 'commands');
    const commandFiles = Util.getFileList(commandsPath);
    
    bot.logger.info(`Loading ${commandFiles.length} commands... (This may take a while)`, "COMMANDS");

    for (const file of commandFiles) {
        const command = require(file);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            bot.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property`);
        }
        
        bot.logger.debug(`Loaded ${command.data.name}.js`, `CMD DEBUG`);
    }
}

