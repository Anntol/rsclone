import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import userRoutes from './routes/user.js';
import { MONGO_CONNECTION_STRING } from './config.js';

const app = express();

if (!MONGO_CONNECTION_STRING) {
  console.error('MONGO_CONNECTION_STRING is not defined!');
} else {
  const connect = () => {
    mongoose
      .connect(MONGO_CONNECTION_STRING || '', { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return console.info(`Successfully connected to MongoDb`);
      })
      .catch((error) => {
        console.error('Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
}

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use((req: express.Request, res: express.Response, next) => {
  console.log('express ', req.body);
  // res.send('Express works!');
  next();
});

app.use('/api/user', userRoutes);

export default app;
