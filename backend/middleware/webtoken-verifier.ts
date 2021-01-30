import express from 'express';
import jwt from 'jsonwebtoken';

import AppError from '../appError.js';
import { SECRET_TOKEN } from '../config.js';
import { ITokenData } from '../models/user.js';

export interface RequestWithUserData extends express.Request {
  userData?: ITokenData;
}

export const verifyToken: express.RequestHandler = (
    req: RequestWithUserData,
    res: express.Response, next: express.NextFunction
  ) => {
  try {
    if (!SECRET_TOKEN) {
      throw new AppError('SECRET_TOKEN is not defined!', 500);
    }

    const token = req.headers.authorization?.split(" ")[1] || '';
    const tokenData = jwt.verify(token, SECRET_TOKEN) as ITokenData;
    console.log('tokenData:', tokenData);
    req.userData = tokenData;

    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};
