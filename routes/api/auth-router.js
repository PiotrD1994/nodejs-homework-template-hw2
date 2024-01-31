import express from "express"
import authorization from "../../middleWares/authorization.js"
import {isEmptyBody} from "../../middleWares/emptyBody.js"
import validateBody from "../../decorations/validBody.js"
import { userSignupSchema, userSigninSchema, userEmailSchema } from "../../schemas/user-schema.js"
import authController from "../../controllers/auth-controller.js"
import upload from "../../middleWares/upload.js"

const authRouter = express.Router()

authRouter.get("/verify/:verifyToken", authController.verify);

authRouter.post("/register", isEmptyBody, validateBody(userSignupSchema), authController.signup)
authRouter.patch("/avatars", authorization, upload.single("avatar"), authController.updateAvatar)
authRouter.post("/verify", isEmptyBody, validateBody(userEmailSchema), authController.resendVerifyEmail)
authRouter.post("/login", isEmptyBody, validateBody(userSigninSchema), authController.signin)
authRouter.post("/logout", authorization, authController.logout)
authRouter.get("/current", authorization, authController.currerntUser)
authRouter.patch("/subscription", authorization, authController.userSubscription)

export default authRouter

