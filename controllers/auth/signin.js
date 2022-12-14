const bcrypt = require('bcryptjs');

const { User } = require('../../models/user');

const { RequestError, createTokens } = require('../../helpers');

const signin = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, 'Email or password is wrong');
  }
  const passCompare = await bcrypt.compare(password, user.password);
  if (!passCompare) {
    throw RequestError(401, 'Email or password is wrong');
  }

  const { accessToken, refreshToken } = await createTokens(user._id);

  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

  res.json({
    accessToken,
    refreshToken,
    user: {
      name: user.name,
    },
  });
};

module.exports = signin;
