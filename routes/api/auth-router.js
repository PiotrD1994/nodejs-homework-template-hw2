import express from "express"
import authorization from "../../middleWares/authorization.js"
import {isEmptyBody} from "../../middleWares/emptyBody.js"
import validateBody from "../../decorations/validBody.js"
import { userSignupSchema, userSigninSchema } from "../../schemas/user-schema.js"
import authController from "../../controllers/auth-controller.js"

const authRouter = express.Router()

authRouter.post("/register", isEmptyBody, validateBody(userSignupSchema), authController.signup)
authRouter.post("/login", isEmptyBody, validateBody(userSigninSchema), authController.signin)
authRouter.post("/logout", authorization, authController.logout)
authRouter.get("/current", authorization, authController.currerntUser)
authRouter.patch("/subscription", authorization, authController.userSubscription)

export default authRouter

