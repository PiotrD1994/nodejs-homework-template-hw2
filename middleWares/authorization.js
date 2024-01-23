import jwt from "jsonwebtoken"
import httpError from "../error/httpError.js"
import dotenv from "dotenv"
import UserModel from "../models/user.js" 

dotenv.config()

const {JWT_SECRET} = process.env

const authorization = async (req, res, next) => {
    const {authorization} = req.headers
    if(!authorization) {
        return next(httpError(401, "Not authorized"))
    }
const [bearer, token] = authorization.split(" ")
 if(bearer !=="Bearer") {
 return next(httpError(401, "Not authorized"))
 }
 try {
    const {id} = jwt.verify(token, JWT_SECRET)
    const user = await UserModel.findById(id)
    if(!user || !user.token || user !== user.token) {
        return next(httpError(401, "Not authorized"))
    }
    req.user = user
    next()
 }catch(error){
    next(httpError(401, "Not authorized"))
 }
}

export default authorization