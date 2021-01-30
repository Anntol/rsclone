import express from 'express';
import { verifyToken } from '../middleware/webtoken-verifier.js'

const router = express.Router();

router.post('/add', verifyToken, (req: express.Request) => {
  console.log('fav route', req.body);
});

export default router;
