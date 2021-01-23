import express from 'express';

import { UsersService } from '../services/users.service.js';

const usersService = new UsersService();
const router = express.Router();

router.route('/signup').post(async (req: express.Request, res: express.Response) => {
  await usersService.SignUp(req.body)
  .then((newUser) => {
    res.status(201).json({
      message: 'User created!',
      ...newUser
    });
  },
  (error) => console.error(error));
});

router.route('/login').post(async (req: express.Request, res: express.Response) => {
  await usersService.LogIn(req.body)
  .then((authToken) => {
    res.status(201).json({
      message: 'User logged in!',
      ...authToken
    });
  },
  (error) => console.error(error));
});

export default router;
