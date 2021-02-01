import mongoose from 'mongoose';
import UserFavouriteModel, { IFavourite, IUserFavourite } from '../models/favourite.model.js';
import UserSettingsModel, { IUserInfo, IUserSettings } from '../models/settings.model.js';
import AppError from '../appError.js';

export class UserSettingsService {
  public async AddFavourite(fav: IFavourite, userId: string): Promise<IUserFavourite> {
    let dbUserFav = await UserFavouriteModel.findOne({ userId }).exec();
    if (dbUserFav) {
      dbUserFav.favourites.push(fav); // TODO why addToSet does not exist
    } else {
      dbUserFav = new UserFavouriteModel({
        userId: mongoose.Types.ObjectId(userId),
        favourites: [fav]
      });
    }
    return dbUserFav.save()
      .then((newFav) => newFav,
      (error: Error) => {
        console.error(error);
        throw new AppError(`Favourite creation failed: ${error.message}`, 400);
      });
  }

  public async RemoveFavourite(projectId: number, userId: string): Promise<IUserFavourite> {
    const dbUserFav = await UserFavouriteModel.findOne({ userId }).exec();
    if (!dbUserFav) {
      throw new AppError('Favourite was not found', 404);
    }
    const index = dbUserFav.favourites.findIndex((item) => item.projectId === projectId);
    if (index > -1) {
      dbUserFav.favourites.splice(index, 1);
    }

    return dbUserFav.save()
      .then((dbFav) => dbFav,
      (error: Error) => {
        console.error(error);
        throw new AppError(`Favourite removing failed: ${error.message}`, 400);
      });
  }

  public async GetUserFavourites(userId: string): Promise<IFavourite[]> {
    const dbUserFav = await UserFavouriteModel.findOne({ userId }).exec();
    return dbUserFav?.favourites || [];
  }

  public async SaveUserInfoSettings(userInfo: IUserInfo, userId: string): Promise<IUserSettings> {
    let dbUserSettings = await UserSettingsModel.findOne({ userId }).exec();
    if (dbUserSettings) {
      dbUserSettings.userInfo = userInfo;
    } else {
      dbUserSettings = new UserSettingsModel({
        userId: mongoose.Types.ObjectId(userId),
        userInfo
      });
    }
    return dbUserSettings.save()
      .then((newSettings) => newSettings,
      (error: Error) => {
        console.error(error);
        throw new AppError(`User settings saving failed: ${error.message}`, 400);
      });
  }
}
