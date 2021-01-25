import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

const environment = process.env.NODE_ENV || 'development';
if (environment === 'development') {
  logger.add(new winston.transports.Console({
    format: winston.format.colorize({ all: true })
  }));
}

export default logger;
