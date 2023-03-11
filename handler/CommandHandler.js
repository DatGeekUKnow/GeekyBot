const chalk = require('chalk');
const { readdirSync } = require('fs');
const path = require('node:path');


const getFileList = (dirName) => {
    let files = [];
    const items = readdirSync(dirName, { withFileTypes: true });

    for (const item of items) {
        if (item.isDirectory()) {
            files = [...files, ...getFileList(`${dirName}/${item.name}`)];
        } else {
            files.push(`${dirName}/${item.name}`);
        }
    }
    return files;
};


module.exports = async function loadCommands(bot) {
    const commandsPath = path.join(__dirname.substring(0, __dirname.lastIndexOf('/')), 'commands');
    
    const commandFiles = getFileList(commandsPath);
    bot.logger.info("COMMANDS", `Loading ${commandFiles.length} commands... (This may take a while)`)


    for await (const file of commandFiles) {
        const command = require(`${file}`);


        if (!command.data.name) {
            throw new TypeError(`[ERROR] name is required for commands! (${file})`);
        }
        
        if (!command.execute) {
            throw new TypeError(`[ERROR] execute function is required for commands! (${file})`);
        }

        // debug
        bot.logger.debug(`CMD DEBUG`, `Loaded ${command.data.name}.js`);
        bot.commands.set (command.data.name, command);
    }

    console.log(chalk.green('[DatGeekUKnow]') + chalk.cyan(' Thanks for using GeekyBot!'));
    console.log(chalk.red('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+'));
    console.log(chalk.green('Bot: ') + chalk.cyan(`${bot.user.tag}`));
    console.log(chalk.green('Status: ') + chalk.cyan('Initialized'));
    console.log(chalk.red('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+'));

};