const jwt = require('jsonwebtoken');

// const { User } = require('../models/user');

const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = process.env;

const createTokens = async (id) => {
  const payload = {
    id,
  };

  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: '10m',
  });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: '3d',
  });

  // await User.findByIdAndUpdate(id, { accessToken, refreshToken });

  return { accessToken, refreshToken };
};

module.exports = createTokens;
