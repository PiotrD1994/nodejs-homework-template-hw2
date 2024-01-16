import httpError from "../error/httpError.js";

const validateBody = (schema) => {
  const verification = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(httpError(400, error.message));
    }
    next();
  };
  return verification;
};

export default validateBody;