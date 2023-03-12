const path = require('node:path');
const Util = require('../modules/Util');

module.exports = function loadEvents(bot) {
    
    // load in all event files.
    const eventsPath = path.join(__dirname.substring(0, __dirname.lastIndexOf('/')), 'events');
    const eventFiles = Util.getFileList(eventsPath);
    
    bot.logger.info("EVENTS", `Loading ${eventFiles.length} events...`)

    for (const file of eventFiles) {
        const event = require(file);

        if (event.once) {
            bot.once(event.name, (...args) => event.execute(...args));
        } else {
            bot.on(event.name, (...args) => event.execute(...args));
        }
        bot.logger.debug(`EVT DEBUG`, `Loaded ${event.name}.js`)
    }
}