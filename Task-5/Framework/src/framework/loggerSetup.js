const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(({timestamp, level, message}) => {
    return `[${level}] ${timestamp}: ${message} `;
  });

const loggerSetup = () => {
    return createLogger({
        level: 'debug',
        format: combine(
            timestamp({format: "HH:mm:ss"}),
            myFormat
          ),
        transports: [
            new transports.File({ filename: 'logs/logs.txt', format: myFormat , options: { flags: 'w' }}),
            new transports.Console({ level: 'info'})
        ],
    });
} 

module.exports = loggerSetup;