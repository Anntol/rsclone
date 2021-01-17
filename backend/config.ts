import dotenv from 'dotenv';

const envConfig = dotenv.config();
if (envConfig.error) {
  console.error(envConfig.error);
}

export const { MONGO_CONNECTION_STRING, SECRET_TOKEN } = process.env;
