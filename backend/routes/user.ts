/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import bcrypt from 'bcrypt';

import UserModel, { IUser } from '../models/user.js';

const router = express.Router();

interface ICreateUser {
  email: IUser['email'];
  password: IUser['password'];
}

router.post('/signup', (req, res) => {
  console.log('back route', req.body);
  const hashLength = 10;
  const hash = bcrypt.hashSync(req.body.password, hashLength);
  const user: ICreateUser = {
    email: req.body.email,
    password: hash
  };
  UserModel.create(user)
    .then((result) => {
      res.status(201).json({
        message: 'User created!',
        result
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
});

export default router;
