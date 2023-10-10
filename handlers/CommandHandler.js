const path = require('node:path');
const Util = require('../modules/Util');

module.exports = function loadEvents(bot) {

    // load in all command files

    const commandsPath = path.join(__dirname.substring(0, __dirname.lastIndexOf('/')), 'commands');
    const commandFiles = Util.getFileList(commandsPath);
    
    bot.logger.info("COMMANDS", `Loading ${commandFiles.length} commands... (This may take a while)`);

    for (const file of commandFiles) {
        const command = require(file);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            bot.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property`);
        }
        
        bot.logger.debug(`CMD DEBUG`, `Loaded ${command.data.name}.js`)
    }
}

