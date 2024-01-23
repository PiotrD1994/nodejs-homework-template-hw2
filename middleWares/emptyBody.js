import httpError from '../error/httpError.js'

export const isEmptyBody = (req, res, next) => {
    const {length} = Object.keys(req.body)
    if(!length) {
        return next(httpError(400, "no fields, body must have fields"))
    }
    next()
}

