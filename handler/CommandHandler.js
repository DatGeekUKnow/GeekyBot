const chalk = require('chalk');
const fs = require('node:fs');
const path = require('node:path');

module.exports = async function loadCommands(bot) {
    const commandsPath = __dirname.substring(0, __dirname.lastIndexOf('/')) + '/commands';
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    bot.logger.info("COMMANDS", `Loading ${commandFiles.length} commands... (This may take a while)`)


    for await (const file of commandFiles) {
        const command = require(`../commands/${file}`);

        if (!command.name) {
            throw new TypeError(`[ERROR] name is required for commands! (${file})`);
        }
        
        if (!command.execute) {
            throw new TypeError(`[ERROR] execute function is required for commands! (${file})`);
        }

        const data = {
            name: command.name,
            description: command?.description ?? "Empty description",
            options: command?.options ?? []
        };

        const cmd = bot.application?.commands.cache.find((c) = c.name === command.name);
        if (!cmd) {
            bot.application?.commands.create(data);
        }

        // debug
        bot.logger.debug(`CMD DEBUG`, `Loaded ${command.name}.js`);

        delete require.cache[require.resolve(`../events/${file}`)];
        bot.commands.set (command.name, command);
    }

    console.log(chalk.green('[DatGeekUKnow]') + chalk.cyan(' Thanks for using GeekyBot!'));
    console.log(chalk.red('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+'));
    console.log(chalk.green('Bot: ') + chalk.cyan(`${bot.user.tag}`));
    console.log(chalk.green('Status: ') + chalk.cyan('Initialized'));
    console.log(chalk.red('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+'));

};