import { Schema, Types } from 'mongoose';

export interface TaskDB {
  _id: Types.ObjectId;
  account: Types.ObjectId;
  active: boolean;
  name: string;
  title: string;
  description: string;
  taskType: string;
  priority: boolean;
  isCompleted: boolean;
  dueDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export const taskDbSchema: Schema = new Schema<TaskDB>(
  {
    active: { type: Boolean, required: true, default: true },
    account: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      index: true,
      required: true,
    },
    name: {
      type: String,
      index: true,
      required: true,
    },
    // title: {
    //   type: String,
    //   required: true,
    //   minlength: 3,
    //   maxlength: 255
    // },
    description: String,
    taskType: {
      type: String,
      required: true,
      enum: {
        values: ['Official', 'Personal', 'Hobby', 'Other'],
      },
    },
    priority: {
      type: Boolean,
      default: false,
    },
    isCompleted: { type: Boolean, default: false },
    dueDate: { type: Date },
  },
  {
    collection: 'tasks',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
