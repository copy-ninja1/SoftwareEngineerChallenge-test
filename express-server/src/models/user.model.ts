import { injectable, singleton } from "tsyringe";
import mongoose from "mongoose";
import ModelI from "../interfaces/model.interface";
import UserSI from "../interfaces/user.interface";

@singleton()
@injectable()
export default class UserModel implements ModelI {
  schema: mongoose.Schema<any> = new mongoose.Schema(
    {
      id: {
        type: String,
        required: true,
        unique: true,
        index: true,
        default: mongoose.Types.ObjectId,
      },
      accessToken: {
        type: String,
        required: true,
      },
      fbId: { type: String, required: true },
      name: {
        type: String,
        required: true,
      },
      emailAddress: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  model: mongoose.Model<any, {}> = mongoose.model<UserSI>("users", this.schema);
}
