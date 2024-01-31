import UserModel from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import httpError from "../error/httpError.js"
import dotenv from "dotenv"
import { userSchema } from "../models/user.js"
import path from "path"
import gravatar from "gravatar"
import Jimp from "jimp"
import fs from "fs/promises"
import { sendEmail } from "../error/SendEmail.js"
import { nanoid } from "nanoid"


dotenv.config()
const preservationAvatarPath = path.resolve('public', 'avatars')

const saltUserSignUp = 10
const {JWT_SECRET, BASE_URL} = process.env

const signup = async(req, res) => {
    const {email, password} = req.body
    const user = await UserModel.findOne({email})
    if(user) {
     return httpError(409, "Email is already used")
    }
const avatarURL = gravatar.url(email)    
const hashPassword = await bcrypt.hash(password, saltUserSignUp)
const veryficationCode = nanoid()
const newUser = await UserModel.create({...req.body, avatarURL, password: hashPassword, veryficationCode, })


const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${veryficationCode}">Click for verify</a>`
}

await sendEmail(verifyEmail)
 return res.status(201).json({
    user: {
        email: newUser.email,
        subscription: newUser.subscription,
    }
})
}

const verify = async (req, res) => {
    const { verificationCode } = req.params;
  
    const user = await UserModel.findOne({ verificationCode });
    if (!user) {
      throw httpError(404, "User not found");
    }
  
    await UserModel.findByIdAndUpdate(user._id, {
      verify: true,
      verificationCode: "",
    });
  
    res.json({ message: "Verification successful" });
  };

  
const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
  
    if (!user) {
      throw httpError(404, "Email not found");
    }
  
    if (user.verify) {
      throw httpError(400, "Verification has already been passed");
    }
  
    const verifyEmail = {
      to: email,
      subject: "Verify email ",
      html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationCode}">Click for verify</a>`,
    };
  
    await sendEmail(verifyEmail);
  
    res.json({ message: "Verification email sent" });
  };

const signin = async (req, res) => {
    const {email, password} = req.body
    const user = await UserModel.fingOne({email})
    if(!user) {
        return httpError(401, "email or password is wrong")
    }
    const comparePassword = await bcrypt.compare(password, user.password)
    if(!comparePassword) {
        return next(httpError(401, "Email or password is wrong"))
    }
    const {_id: id } = user
    const payload = {
        id,
    }
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn:"23h"})
    await UserModel.findByIdAndUpdate(id,{token})
     return res.json({
        token: token,
        user: {
            email: user.email,
            subscription: user.subscription,
        }
    })
}

const currerntUser = async(req, res) => {
    const {email, subscription} = req.user
    return res.json({
        email,
        subscription,
    })
}

const logout = async(req, res) => {
    const {_id} = req.user
    if(!_id) {
        return next(httpError(401, "Not authorized"))
    }
    await UserModel.findByIdAndUpdate(_id, {token: ""})
   return  res.status(204).json()
}

const userSubscription = async(req, res) => {
    const {subscription} = req.body
    const {_id} = req.user
    const validValueSubscribtion = userSchema.path("subscription").enumValues
    if(!validValueSubscribtion.includes(subscription)) {
        return httpError(400, "Invalid subscription")
    }
    const user = await UserModel.findByIdAndUpdate(_id, {subscription})
    if(!user) {
        return httpError(404, "User not found")
    }
     return res.json(user)
}

const updateAvatar = async(req, res, next) => {
if(!req.file) {
return next(httpError(400, "Avatar not found"))
}
const {originalname, path: oldPath} = req.file
const {_id: id} = req.user
const jimpAvatar = await Jimp.read(oldPath)
await jimpAvatar.resize(250, 250).quality(60).write(oldPath)
const newName = `${Date.now()}_${originalname}`;
const newPath = path.join(preservationAvatarPath, newName);
await fs.rename(oldPath, newPath);
const avatarURL = path.join("avatars", newName);
await User.findByIdAndUpdate(id, { avatarURL });
res.status(200).json({ avatarURL });
}

export default {
    signin,
    signup,
    currerntUser,
    logout,
    userSubscription,
    updateAvatar,
    verify,
    resendVerifyEmail
}