import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const favouriteSchema = new Schema({
  projectId: { type: Number, required: true },
  title: { type: String, required: true }
});

const userFavouriteSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  favourites: favouriteSchema
});

export interface IFavourite extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  projectId: number;
  title: string;
}

export interface IUserFavourite extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  favourites: IFavourite[];
}

export default model<IUserFavourite>('UserFavourite', userFavouriteSchema);
