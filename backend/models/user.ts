import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import mongoose from 'mongoose';
import { Document, Schema, model } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  verificationToken: string;
  resetPasswordToken: string;
  resetPasswordExpires: Date;
  phoneNumber?: string;
  addresses: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String, default: '' },
  resetPasswordToken: { type: String, default: '' },
  resetPasswordExpires: { type: Date, default: Date.now },
  addresses: [{ type: Schema.Types.ObjectId, ref: 'Address'}]
}, { timestamps: true });

// hash the password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
}); 

// compare the password with hashed password
UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};


const UserModel = model<User>('User', UserSchema);

export default UserModel;
