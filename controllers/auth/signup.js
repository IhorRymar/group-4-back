const bcrypt = require('bcryptjs');

const { User } = require('../../models/user');

const { RequestError } = require('../../helpers');

const signup = async (req, res) => {
  const { name, password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, 'Email in use');
  }
  const hashPass = await bcrypt.hash(password, 10);
  const result = await User.create({
    name,
    password: hashPass,
    email,
  });
  res.status(201).json({
    user: {
      id: result.id,
      name: result.name,
      email: result.email,
    },
  });
};

module.exports = signup;
