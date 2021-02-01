import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const appSettingsSchema = new Schema({
  country: { type: String, default: 'ua' },
  language: { type: String, default: 'en' },
  darkMode: { type: Boolean, default: false }
});

const userInfoSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  city: { type: String },
  country: { type: String },
  phone: { type: String }
});

const userSettingsSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  appSettings: appSettingsSchema,
  userInfo: userInfoSchema
});

export interface IAppSettings extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  country: string,
  language: string,
  darkMode: boolean
}

export interface IUserInfo extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  firstName: string,
  lastName: string,
  city: string,
  country: string,
  phone: string
}

export interface IUserSettings extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  appSettings: IAppSettings,
  userInfo: IUserInfo
}

export default model<IUserSettings>('UserSetting', userSettingsSchema);
