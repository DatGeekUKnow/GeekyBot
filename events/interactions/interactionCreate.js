const { Events } = require('discord.js');
const { owners } = require("../../config.json");

module.exports = {
    name: Events.InteractionCreate,
    async execute(bot, interaction) {
        if (!interaction.isCommand()) return;
        if (!interaction.inGuild()) return;
        
        try {
            const command = bot.commands.get(interaction.command?.name ?? "");

            if (!command) return;
            
            if ((command.category === 'botowner' || command.ownerOnly === true) && !owners.includes(interaction.user.id)) 
                return bot.say.errorMessage(interaction, "This command can only be used by the bot owners.");

            await command.execute(interaction);
            console.log(`Succesfully handled ${interaction.commandName} request by ${interaction.user.username} in ${interaction.guild.name}!`)
        } catch (error) {
            console.error(`Error executing ${interaction.commandName}`);
            console.error(error);
            return bot.say.errorMessage(interaction, "Something went wrong. Sorry for the inconveniences.");
        }
    }
};