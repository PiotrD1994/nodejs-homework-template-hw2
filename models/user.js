import {Schema, model} from "mongoose"
import { addUpdateOptions, handleSaveError } from "./hooks.js"

const userSchema = new Schema(
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
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
      },
      token: String,
      default: null,
    },
    { versionKey: false, timestamps: true }
  );

  userSchema.post("save", handleSaveError)
  userSchema.pre("findOneAndUpdate", addUpdateOptions)
  userSchema.post("findOneAndUpdate", handleSaveError)

  const userModel = model("user", userSchema)

  export default userModel