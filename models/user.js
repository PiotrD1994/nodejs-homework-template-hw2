import {Schema, model} from "mongoose"
import { addUpdateOptions, handleSaveError } from "./hooks.js"

export const userSchema = new Schema(
    {
      password: {
        type: String,
        required: [true, "Password is required"],
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
      },
      avatarURL: {
        type: String
      },
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
      },
      token: String,
    },
    { versionKey: false, timestamps: true }
  );

  userSchema.post("save", handleSaveError)
  userSchema.pre("findOneAndUpdate", addUpdateOptions)
  userSchema.post("findOneAndUpdate", handleSaveError)

  const UserModel = model("user", userSchema)

  export default UserModel