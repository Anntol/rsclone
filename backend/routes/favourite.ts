import express from 'express';

const router = express.Router();

router.post('/add', (req: express.Request) => {
  console.log('fav route', req.body);
});

export default router;
