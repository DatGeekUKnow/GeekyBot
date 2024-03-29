const { REST, Routes } = require('discord.js');
const {clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const { getFileList } = require('./modules/Util');
const logger = require('./modules/Logger.js')

const commands = [];
//Grab all the command files from the commands directory you created earlier
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = getFileList(commandsPath);

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
    const command = require(file);
    commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// and deploy your commands!
(async () => {
    try {
        logger.debug(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        logger.debug(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of courese, make sure you catch and log any errors!
        logger.error(error);
    }
})();