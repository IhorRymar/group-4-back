const { User } = require('../../models/user');

const balance = async (req, res) => {
  const { currentBalance } = req.body;
  const { _id } = req.user;
  await User.findByIdAndUpdate(
    _id,
    { currentBalance },
    {
      new: true,
    }
  );
  res.json({
    currentBalance,
  });
};

module.exports = balance;
