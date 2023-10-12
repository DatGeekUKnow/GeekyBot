const path = require('node:path');
const Util = require('../modules/Util');

module.exports = function loadEvents(bot) {
    
    // load in all event files.
    const eventsPath = path.join(__dirname.substring(0, __dirname.lastIndexOf('/')), 'events');
    const eventFiles = Util.getFileList(eventsPath);
    
    bot.logger.info(`Loading ${eventFiles.length} events...`, "EVENTS");

    for (const file of eventFiles) {
        const event = require(file);

        // need to subscribe player events to bot.player
        if (file.name?.lastIndexOf('player') > 0) {
            bot.player.on(event.name, (...args) => event.execute(...args));
        }
        else if (event.once) {
            bot.once(event.name, (...args) => event.execute(...args));
        } else {
            bot.on(event.name, (...args) => event.execute(...args));
        }
        bot.logger.debug(`Loaded ${event.name}.js`, `EVT DEBUG`);
    }
}