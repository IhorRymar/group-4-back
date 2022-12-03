const current = async (req, res) => {
  const { name, email, accessToken, refreshToken, _id } = req.user;

  res.json({
    name,
    email,
    accessToken,
    refreshToken,
    id: _id,
  });
};

module.exports = current;
