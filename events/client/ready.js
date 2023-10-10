const { Events } = require('discord.js');
const chalk = require('chalk');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(bot) {
        require('../../handlers/CommandHandler')(bot);
        console.log(chalk.green('[DatGeekUKnow]') + chalk.cyan(' Thanks for using GeekyBot 💜'))
        console.log(chalk.red('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+='))
        console.log(chalk.green('Bot: ') + chalk.cyan(`${bot.user.tag}`))
        console.log(chalk.green('Status: ') + chalk.cyan('Initialized'))
        console.log(chalk.red('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+='))

    },
};