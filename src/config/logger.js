const winston = require('winston');

const chalk = require('chalk');

module.exports = winston.createLogger({
  transports: [
    new winston.transports.Console({
      formatter: function(options) {
        let message = '';

        if (options.message !== undefined) {
          message = options.message;
        }

        let meta = '';

        if (options.meta && Object.keys(options.meta).length) {
          meta = `\n\t${JSON.stringify(options.meta)}`;
        }

        let level = options.level.toUpperCase();

        switch (level) {
          case 'INFO':
            level = chalk.cyan(level);
            break;

          case 'WARN':
            level = chalk.yellow(level);
            break;

          case 'ERROR':
            level = chalk.red(level);
            break;

          default:
            break;
        }

        const output = [`[${level}]`, message, meta];

        return output.join(' ');
      }
    })
  ]
});
