const fs = require('node:fs');
const path = require('node:path');

module.exports = function loadEvents(bot) {
    const eventFiles = fs.readdirSync((__dirname.substring(0, __dirname.lastIndexOf('/'))) + '/events').filter(file => file.endsWith('.js'));
    
    eventFiles.forEach((file) => {
        const event = require(`../events/${file}`);

        let type = (file.includes('player.')) ? 'player' : 'bot';
        
        if (!event.execute) {
            throw  new TypeError(`[ERROR] execute function is required for events! (${file})`);
        }

        if (type === 'player') {
            bot.player.on(event.name, event.execute.bind(null, bot));
        } else if (event.once) {
            bot.once(event.name, event.execute.bind(null, bot));
        } else {
            bot.on(event.name, event.execute.bind(null, bot));
        }

        delete require.cache[require.resolve(`../events/${file}`)];

    });
};