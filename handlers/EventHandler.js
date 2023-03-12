const fs = require('node:fs');
const path = require('node:path');


module.exports = function loadEvents(bot) {
    
    // load in all event files.
    const eventsPath = path.join(__dirname.substring(0, __dirname.lastIndexOf('/')), 'events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    
    bot.logger.info("EVENTS", `Loading ${eventFiles.length} events...`)

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);

        if (event.once) {
            bot.once(event.name, (...args) => event.execute(...args));
        } else {
            bot.on(event.name, (...args) => event.execute(...args));
        }
        bot.logger.debug(`EVT DEBUG`, `Loaded ${event.name}.js`)
    }
}