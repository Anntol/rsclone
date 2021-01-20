import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import userRoutes from './routes/user.js';
import { MONGO_CONNECTION_STRING } from './config.js';
import AppError from './appError.js';

const app = express();

if (!MONGO_CONNECTION_STRING) {
  console.error('MONGO_CONNECTION_STRING is not defined!');
} else {
  const connect = () => {
    mongoose
      .connect(MONGO_CONNECTION_STRING || '', { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.info(`Successfully connected to MongoDb`))
      .catch((error: Error) => {
        console.error('Error connecting to database: ', error.message);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
}

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: 'Internal server error',
    error: err,
  });
  next();
});

app.use('/api/user', userRoutes);

export default app;