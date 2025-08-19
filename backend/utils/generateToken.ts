import jwt from 'jsonwebtoken';
import { UserDocument } from '../models/user';
import mongoose from 'mongoose';

interface TokenPayload {
  _id: string;
  email: string;
}

const generateToken = (user: UserDocument): string => {
  
  const payload: TokenPayload = {
    _id: (user._id as mongoose.Types.ObjectId).toString(),
    email: user.email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET || 'its me bro', {
    expiresIn: '1h',
  });
};

export default generateToken;
