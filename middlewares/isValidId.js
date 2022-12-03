const { isValidObjectId } = require('mongoose');

const { RequestError } = require('../helpers');

const isValidId = (req, res, next) => {
  const { transactionId } = req.params;
  const result = isValidObjectId(transactionId);
  if (!result) {
    next(RequestError(400, 'Invalid id format'));
  }
  next();
};

module.exports = isValidId;
