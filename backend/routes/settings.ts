import express from 'express';
import logger from '../logger.js';
import AppError from '../appError.js';
import { RequestWithUserData, verifyToken } from '../middleware/webtoken-verifier.js'
import { UserSettingsService } from '../services/userSettings.service.js';

const settingsService = new UserSettingsService();
const router = express.Router();

router.post('/', verifyToken, (async (req: RequestWithUserData, res: express.Response) => {
  if (req.userData) {
    await settingsService.SaveUserInfoSettings(req.body, req.userData.userId)
    .then((dbSettings) => {
      res.status(201).json({
        message: 'Settings saved!',
        ...dbSettings
      });
    },
    (error: AppError) => {
      logger.error(error.message);
      res.status(error.statusCode || 500).json({
        message: error.message
      })
    });
  } else {
    res.status(401).json({ message: "Not authorized!" });
  }
}));

router.get('/', verifyToken, (async (req: RequestWithUserData, res: express.Response) => {
  if (req.userData) {
    await settingsService.GetUserInfoSettings(req.userData.userId)
    .then((userInfoSettings) => {
      const result = {
        firstName: userInfoSettings.firstName,
        lastName: userInfoSettings.lastName,
        city: userInfoSettings.city,
        country: userInfoSettings.country,
        phone: userInfoSettings.phone,
        email: req.userData?.email
      };
      res.status(200).json({
        message: 'Settings fetched successfully!',
        userInfo: result
      });
    },
    (error: AppError) => {
      logger.error(error.message);
      res.status(error.statusCode || 500).json({
        message: error.message
      })
    });
  } else {
    res.status(401).json({ message: "Not authorized!" });
  }
}));

export default router;
