const queryString = require('query-string');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../../models/user');

const { GOOGLE_CLI_ID, GOOGLE_CLI_SECRET, BASE_URL, ACCESS_TOKEN_SECRET_KEY } =
  process.env;

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: GOOGLE_CLI_ID,
      client_secret: GOOGLE_CLI_SECRET,
      redirect_uri: `${BASE_URL}/api/users/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  });

  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const { name, email } = userData.data;
  const { access_token: accessToken } = tokenData.data;
  const user = await User.findOne({ email });
  const hashPass = await bcrypt.hash(uuidv4(), 10);

  if (!user) {
    const result = new User({
      email,
      name,
      password: hashPass,
      accessToken,
    });
    await result.save();
  }

  const gToken = jwt.sign({ id: user._id }, ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: '6h',
  });

  await User.findByIdAndUpdate(user._id, { accessToken: gToken });

  if (user && user.accessToken === null) {
    await User.findByIdAndUpdate(user._id, { accessToken });
  }

  // return { gToken };

  res.status(201).json({
    gToken,
  });
};

module.exports = googleRedirect;
