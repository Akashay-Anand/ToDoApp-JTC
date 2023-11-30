import { Schema, Types } from 'mongoose';

export interface AccountDB {
  _id: Types.ObjectId;
  active: boolean;
  name: string;
  username: string;
  email: string;
  hashedPassword: string;
}

export const accountDbSchema: Schema = new Schema<AccountDB>(
  {
    active: { type: Boolean, required: true },
    hashedPassword: { type: String, required: true },
    username: {
      type: String,
      index: true,
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true}
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
