import express from 'express';

const app: express.Application = express();

app.use((req: express.Request, res: express.Response) => {
  res.send('Express works!');
});

export default app;
