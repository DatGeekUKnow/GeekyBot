// source: https://github.com/Aayush-683/BrokenDisc
const chalk = import("chalk").then(m=>m.default);

class Logger {
  get now() {
    return Intl.DateTimeFormat("be-BE", {
      minute: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      month: "2-digit",
      year: "numeric",
      second: "2-digit",
    }).format(Date.now());
  }

  /**
   * @param {string} type
   * @param {string} error
   */
  async error(error, type) {
    const err = error instanceof Error ? error.message : error;
    return console.error(`${(await chalk).red(`[${type ?? "ERROR"}]`)}-[${this.now}]: ${err}`);
  }

  /**
   * @param {string} type
   * @param {string} warning
   */
  async warn(warning, type) {
    return console.warn(`${(await chalk).yellow(`[${type ?? "WARNING"}]`)}-[${this.now}]: ${warning}`);
  }

  /**
   * @param {string} type
   * @param {string} content
   */
  async info(content, type) {
    return console.log(`${(await chalk).blueBright(`[${type ?? "INFO"}]`)}-[${this.now}]: ${content}`);
  }

  /**
   * @param {string} type
   * @param {string} text
   */
  async debug(text, type) {
    return console.log(`${(await chalk).green(`[${type ?? "DEBUG"}]`)}-[${this.now}]: ${text}`);
  }
}

module.exports = new Logger();