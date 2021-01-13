/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';

const router = express.Router();

router.post('/signup', (req) => {
  console.log('back route', req.body);
});

export default router;
