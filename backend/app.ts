import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import morgan from 'morgan';

import userRoutes from './routes/user.js';
import favouriteRoutes from './routes/favourite.js';
import settingsRoutes from './routes/settings.js'

import { MONGO_CONNECTION_STRING } from './config.js';
import AppError from './appError.js';
import logger from './logger.js'

const app = express();

const morganMessage = ":date[iso] :method :url :status :response-time ms";
app.use(morgan(morganMessage, {
  stream: {
    write: (message: string) => logger.http(message)
  },
}));

if (!MONGO_CONNECTION_STRING) {
  logger.error('MONGO_CONNECTION_STRING is not defined!');
} else {
  const connect = () => {
    mongoose
      .connect(MONGO_CONNECTION_STRING || '', { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => logger.info(`Successfully connected to MongoDb`))
      .catch((error: Error) => {
        logger.error('Error connecting to database: ', error.message);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
}

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const distAngular = "dist/rsclone";
app.use('/', express.static(distAngular));

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
app.use('/api/userFavourite', favouriteRoutes);
app.use('/api/userSettings', settingsRoutes);
app.use((req, res) => {
  res.sendFile(path.join(path.resolve(), distAngular, "index.html"));
});

export default app;
