const jwt = require('jsonwebtoken');

const { User } = require('../models/user');

const { RequestError } = require('../helpers');

const { ACCESS_TOKEN_SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [bearer, accessToken] = authorization.split(' ');
    if (bearer !== 'Bearer') {
      throw RequestError(401, 'Not authorized');
    }
    const { id } = jwt.verify(accessToken, ACCESS_TOKEN_SECRET_KEY);
    const user = await User.findById(id);
    if (!user || user.accessToken !== accessToken) {
      throw RequestError(401);
    }
    req.user = user;
    next();
  } catch (e) {
    if (!e.status) {
      e.status = 401;
    }
    next(e);
  }
};

module.exports = authenticate;
