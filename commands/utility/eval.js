const { SlashCommandBuilder }= require('discord.js');
const { ownerId, token } = require('../../config.json');

// This function cleans up and prepares the
// result of our eval command input for sending
// to the channel
const clean = async (client, text) => {
    // If our input is a promise, await it before continuing
    if (text && text.constructor.name == "Promise")
      text = await text;
    
    // If the response isn't a string, `util.inspect()`
    // is used to 'stringify' the code in a safe way that
    // won't error out on objects with circular references
    // (like Collections, for example)
    if (typeof text !== "string")
      text = require("util").inspect(text, { depth: 1 });
    
    // Replace symbols with character code alternatives
    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
    
    // Send off the cleaned up result
    text = text.replaceAll(token, "[REDACTED]");
    return text;
    }

module.exports = {
    data: new SlashCommandBuilder()
    .setName('eval')
    .setDescription('Evaluates some javascript *VERY DANGEROUS*')
    .addStringOption(option =>
        option
        .setName('script')
        .setDescription('JavaScript code to be evaluated')
        .setRequired(true)),
    async execute(interaction) {
        if (interaction.user.id !== ownerId) await interaction.reply({ content: `Yeah right! As if I'd ever listen to a scrub like you 😎`, ephemeral: true });

        let script = interaction.options.getString('script');
        
        try {
            // Evaluate (execute) the input
            const evaled = eval(script);

            // clean the result
            const cleaned = await clean(interaction.client, evaled);

            await interaction.reply({ content: `\`\`\`js\n${cleaned}\n\`\`\``, ephemeral: true});
        } catch(err) {
            await interaction.reply({ content: `\`ERROR\` \`\`\`xl\n${script}\n\`\`\`${err}`, ephemeral: true});
        }

    },
};