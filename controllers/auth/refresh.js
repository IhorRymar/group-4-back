const jwt = require('jsonwebtoken');

const { User } = require('../../models/user');

const { RequestError, createTokens } = require('../../helpers');

const { REFRESH_TOKEN_SECRET_KEY } = process.env;

const refresh = async (req, res) => {
  const { refreshToken: rToken } = req.body;
  try {
    const { id } = jwt.verify(rToken, REFRESH_TOKEN_SECRET_KEY);
    const user = await User.findById(id);
    if (!user || user.refreshToken !== rToken) {
      throw new Error('token expired');
    }

    const { accessToken, refreshToken } = await createTokens(user._id);

    await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (e) {
    throw RequestError(401, e.message);
  }
};

module.exports = refresh;
