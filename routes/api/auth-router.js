import express from "express"
import authorisation from "../../middleWares/autorisathion.js"
import isEmptyBody from "../../middleWares/emptyBody.js"
import validateBody from "../../decorations/validBody.js"
import { userSignupSchema, userSigninSchema } from "../../schemas/user-schema.js"
import authController from "../../controllers/auth-controller.js"

const authRouter = express.Router()

authRouter.post("/register", isEmptyBody, validateBody(userSignupSchema), authController.signup)
authRouter.post("/login", isEmptyBody, validateBody(userSigninSchema), authController.signin)
authRouter.post("/logout", authorisation, authController.logout)
authRouter.get("/current", authorisation, authController.currerntUser)
authRouter.patch("/subscription", authorisation, authController.userSubscription)

export default authRouter

