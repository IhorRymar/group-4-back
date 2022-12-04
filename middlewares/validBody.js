const { RequestError } = require('../helpers');

const validBody = (schema) => {
  const f = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(RequestError(400, error.message));
    }
    next();
  };
  return f;
};

module.exports = { validBody };
