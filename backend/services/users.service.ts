/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModel, { IUser, IToken } from '../models/user.js';
import AppError from '../appError.js';
import { SECRET_TOKEN } from '../config.js';

interface IAuthUser {
  email: IUser['email'];
  password: IUser['password'];
}

export class UsersService {
  public async SignUp(reqUser: IUser): Promise<IUser> {
    try {
      const hashLength = 10;
      const hash = await bcrypt.hash(reqUser.password, hashLength);
      const user: IAuthUser = {
        email: reqUser.email,
        password: hash
      };

      return UserModel.create(user)
      .then((newUser) => newUser,
        (error: Error) => {
          throw new AppError(`User creation failed: ${error.message}`, 401);
        });
    }
    catch(err) {
      throw new AppError(`User creation failed!`, 500);
    };
  }

  public async LogIn(reqUser: IUser): Promise<IToken> {
    try {
      const dbUser = await UserModel.findOne({ email: reqUser.email }).exec();
      if (!dbUser) {
        throw new AppError('Auth failed: user not found', 401);
      }

      const isPwdCorrect = await bcrypt.compare(reqUser.password, dbUser.password);
      if (!isPwdCorrect) {
        throw new AppError('Auth failed: password is incorrect', 401);
      }

      if (!SECRET_TOKEN) {
        throw new AppError('SECRET_TOKEN is not defined!', 500);
      }
      const expiresIn = 3600; // seconds

      const token = jwt.sign({ email: dbUser.email, userId: dbUser._id.toHexString() }, SECRET_TOKEN, { expiresIn });
      return {
        token,
        expiresIn
      }
    }
    catch(err) {
      throw new AppError(`Auth failed!`, 500);
    };
  }
}
