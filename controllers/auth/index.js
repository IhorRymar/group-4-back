const signup = require('./signup');
const signin = require('./signin');
const current = require('./current');
const logout = require('./logout');
const refresh = require('./refresh');
const balance = require('./balance');
const googleRedirect = require('./googleRedirect');
const googleAuth = require('./googleAuth');

module.exports = {
  signup,
  signin,
  current,
  logout,
  refresh,
  balance,
  googleRedirect,
  googleAuth,
};
