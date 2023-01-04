import mongoose from "mongoose";

export default interface UserDocument extends mongoose.Document {
  name: string;
  accessToken: string;
  emailAddress: string;
  createdAt: Date;
  updatedAt: Date;
}
