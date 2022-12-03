const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../../models/user');

const { RequestError } = require('../../helpers');

const { SECRET_KEY } = process.env;

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

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '12h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      name: user.name,
      subscription: user.subscription,
    },
  });
};

module.exports = signin;
