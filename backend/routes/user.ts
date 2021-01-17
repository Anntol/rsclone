/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserModel, { IUser } from '../models/user.js';
import { SECRET_TOKEN } from '../config.js';

const router = express.Router();

interface IAuthUser {
  email: IUser['email'];
  password: IUser['password'];
}

router.post('/signup', (req: express.Request, res: express.Response) => {
  // console.log('back route', req.body);
  const reqBody = req.body as IUser;
  const hashLength = 10;
  const hash = bcrypt.hashSync(reqBody.password, hashLength);
  const user: IAuthUser = {
    email: reqBody.email,
    password: hash
  };
  UserModel.create(user)
    .then((result: IUser) => {
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

router.post('/login', (req, res) => {
  const reqBody = req.body as IUser;

  UserModel.findOne({ email: reqBody.email })
    .exec()
    .then(
      (dbUser) => {
        if (!dbUser) {
          return res.status(401).json({
            message: 'Auth failed: user not found'
          });
        }

        const isPwdCorrect = bcrypt.compareSync(reqBody.password, dbUser.password);
        if (!isPwdCorrect) {
          return res.status(401).json({
            message: 'Auth failed: password is incorrect'
          });
        }

        if (!SECRET_TOKEN) {
          console.error('SECRET_TOKEN is not defined!');
        }
        const secret = SECRET_TOKEN || 'some_secret';
        const expiresIn = 3600; // seconds
        const token = jwt.sign({ email: dbUser.email, userId: dbUser._id }, secret, { expiresIn });
        return res.status(200).json({
          token,
          expiresIn
        });
      },
      () => {}
    )
    .catch((err: Error) => {
      res.status(401).json({
        message: `Auth failed: ${err.message}`
      });
    });
});

export default router;
