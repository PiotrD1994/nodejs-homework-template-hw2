import httpError from "../error/httpError";
export const isEmptyFavorite = (req, res, next) => {
    const {length} = Object.keys(req.body)
    if(!length) {
        return next(httpError(400, "missing favorite"))
    }
    next()
}