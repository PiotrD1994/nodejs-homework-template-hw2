import Joi from "joi"


export const userSignupSchema = Joi.object({
    email: Joi.string().required().messages({
        "string.empty": "email can't be empty",
        "any.required": "Please fill email field"
    }),
    password: Joi.string().min(8).required().messages({
        "string.empty": "password can't be empty",
        "any.required": "Please fill password field"
    }),
});

export const userSigninSchema = Joi.object({
    email: Joi.string().required().messages({
        "string.empty": "email can't be empty",
        "any.required": "Please fill email field"
    }),
    password: Joi.string().min(8).required().messages({
        "string.empty": "password can't be empty",
        "any.required": "Please fill password field"
    }),
});