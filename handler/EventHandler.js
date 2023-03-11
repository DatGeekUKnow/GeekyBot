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

module.exports = function loadEvents(bot) {
    const eventsPath = path.join(__dirname.substring(0, __dirname.lastIndexOf('/')), 'events');

    const eventFiles = getFileList(eventsPath);
    bot.logger.info("EVENTS", `Loading ${eventFiles.length} events...`);
    
    eventFiles.forEach((file) => {
        const event = require(`${file}`);

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

        delete require.cache[require.resolve(`${file}`)];
        
        // debug
        bot.logger.debug(`EVT DEBUG`, `Loaded ${event.name}.js`);
    });
};