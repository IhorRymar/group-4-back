const current = async (req, res) => {
  const { name, email, currentBalance, accessToken, refreshToken, _id } =
    req.user;

  res.json({
    id: _id,
    name,
    email,
    currentBalance,
    accessToken,
    refreshToken,
  });
};

module.exports = current;
