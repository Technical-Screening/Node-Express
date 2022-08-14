const { createLogger, format, transports } = require('winston');

const customFormat = format.combine(
  format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
  format.align(),
  format.printf((i) => `${i.level}: ${[i.timestamp]}: ${i.message}`),
);

const usersLogger = createLogger({
  transports: [
    new transports.File({
      filename: './src/app/logs/user/user-errors.log',
      format: customFormat,
    }),
  ],
});

const authLogger = createLogger({
  transports: [
    new transports.File({
      filename: './src/app/logs/auth/authLog.log',
      format: customFormat,
    }),
  ],
});

const serviceLogger = createLogger({
  transports: [
    new transports.File({
      filename: './src/app/logs/services/service-errors.log',
      format: customFormat,
    }),
  ],
});

module.exports = {
  usersLogger,
  authLogger,
  serviceLogger,
};
