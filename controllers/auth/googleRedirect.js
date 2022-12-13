const queryString = require('query-string');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const { User } = require('../../models/user');

const { createTokens } = require('../../helpers');

const { GOOGLE_CLI_ID, GOOGLE_CLI_SECRET, BASE_URL } = process.env;

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
  const { access_token: gToken } = tokenData.data;
  let user;
  const findUser = await User.findOne({ email });

  if (!findUser) {
    const hashPass = await bcrypt.hash(uuidv4(), 10);
    const result = await User.create({
      email,
      name,
      password: hashPass,
      gToken,
    });
    user = result;

    res.status(201).json({
      user: {
        name: user.name,
        email: user.email,
        accessToken: user.accessToken,
      },
    });
  }
  const { accessToken, refreshToken } = await createTokens(findUser._id);

  await User.findByIdAndUpdate(findUser._id, { accessToken, refreshToken });

  res.status(201).json({
    user: {
      name,
      email,
      accessToken,
    },
  });
};

module.exports = googleRedirect;
