import mongoose from 'mongoose';
import UserFavouriteModel, { IFavourite, IUserFavourite } from '../models/favourite.js';
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
}
