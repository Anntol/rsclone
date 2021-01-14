import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const { model, Schema } = mongoose;
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
userSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
}

export default model<IUser>('User', userSchema);
