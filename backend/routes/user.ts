import express from 'express';
import bcrypt from 'bcrypt';

import UserModel, { IUser } from '../models/user.js';

const router = express.Router();

interface ICreateUser {
  email: IUser['email'];
  password: IUser['password'];
}

router.post('/signup', (req, res) => {
  // console.log('back route', req.body);
  const reqBody = req.body as IUser;
  const hashLength = 10;
  const hash = bcrypt.hashSync(reqBody.password, hashLength);
  const user: ICreateUser = {
    email: reqBody.email,
    password: hash
  };
  UserModel.create(user)
    .then((result) => {
      res.status(201).json({
        message: 'User created!',
        result
      });
    })
    .catch((err: Error) => {
      res.status(500).json({
        error: err
      });
    });
});

export default router;
