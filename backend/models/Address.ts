import mongoose from 'mongoose';
import { Document, Schema, model } from 'mongoose';


export interface Address extends Document {
  user: mongoose.Types.ObjectId;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

const AddressSchema = new Schema<Address>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String, required: false },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
},{timestamps: true});

export const AddressModel = model<Address>('Address', AddressSchema);
