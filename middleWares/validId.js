import { isValidObjectId} from "mongoose";
import {httpError} from "../error/httpError.js"

export const isValidId = (req, res, next) => {
    const {contactId} = req.params
    if(!isValidObjectId(contactId)) {
        return next(httpError(404, `id ${contactId} not valid`))
    }
    next()
}