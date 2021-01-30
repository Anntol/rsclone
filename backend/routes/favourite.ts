import express from 'express';
import AppError from '../appError.js';
import { RequestWithUserData, verifyToken } from '../middleware/webtoken-verifier.js'
import { UserSettingsService } from '../services/userSettings.service.js';

const settingsService = new UserSettingsService();
const router = express.Router();

router.post('/', verifyToken, (async (req: RequestWithUserData, res: express.Response) => {
  if (req.userData) {
    await settingsService.AddFavourite(req.body, req.userData.userId)
    .then((newFavourite) => {
      res.status(201).json({
        message: 'Favourite created!',
        ...newFavourite
      });
    },
    (error: AppError) => {
      // logger.error(error.message); TODO add after logger merge
      console.error(error.message);
      res.status(error.statusCode || 500).json({
        message: error.message
      })
    });
  } else {
    res.status(401).json({ message: "Not authorized!" });
  }
}));

router.delete('/:projectId', verifyToken, (async (req: RequestWithUserData, res: express.Response) => {
  if (req.userData) {
    await settingsService.RemoveFavourite(+req.params.projectId, req.userData.userId)
    .then((userFavourite) => {
      res.status(200).json({
        message: 'Favourite removed!',
        ...userFavourite
      });
    },
    (error: AppError) => {
      // logger.error(error.message); TODO add after logger merge
      console.error(error.message);
      res.status(error.statusCode || 500).json({
        message: error.message
      })
    });
  } else {
    res.status(401).json({ message: "Not authorized!" });
  }
}));

export default router;
