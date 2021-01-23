import dotenv from 'dotenv';

console.log('config NODE_ENV:', process.env.NODE_ENV);
const environment = process.env.NODE_ENV || 'development';
if (environment === 'development') {
  const envConfig = dotenv.config();
  if (envConfig.error) {
    console.error(envConfig.error);
  }
}

export const { MONGO_CONNECTION_STRING, SECRET_TOKEN } = process.env;
