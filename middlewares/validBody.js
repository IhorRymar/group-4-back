const { RequestError } = require('../helpers');

const validBody = (schema) => {
  const f = async (req, res, next) => {
    const { e } = schema.validate(req.body);
    if (e) {
      next(RequestError(400, e.message));
    }
    next();
  };
  return f;
};

module.exports = { validBody };
