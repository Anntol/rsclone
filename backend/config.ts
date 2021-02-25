import dotenv from 'dotenv';
import logger from './logger.js';

const environment = process.env.NODE_ENV || 'development';
if (environment === 'development') {
  const envConfig = dotenv.config();
  if (envConfig.error) {
    logger.error(envConfig.error);
  }
}

export const { MONGO_CONNECTION_STRING, SECRET_TOKEN } = process.env;
