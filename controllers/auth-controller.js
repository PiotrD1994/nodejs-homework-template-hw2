import UserModel from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import httpError from "../error/httpError.js";
import dotenv from "dotenv"
import { userSchema } from "../models/user.js";

dotenv.config()

const saltUserSignUp = 10
const {JWT_SECRET} = process.env

const signup = async(req, res) => {
    const {email, password} = req.body
    const user = await UserModel.findOne({email})
    if(user) {
     return httpError(409, "Email is already used")
    }
const hashPassword = await bcrypt.hash(password, saltUserSignUp)
const newUser = await UserModel.create({...req.body, password: hashPassword })

 return res.status(201).json({
    user: {
        email: newUser.email,
        subscription: newUser.subscription,
    }
})
}

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

export default {
    signin,
    signup,
    currerntUser,
    logout,
    userSubscription,
}