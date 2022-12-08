const jwt = require('jsonwebtoken');
const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleSaveErr } = require('../helpers');

const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = process.env;

const emailRegexp = /(^[^@.]+)@([^@.]+)\.{1}(\w{1,6}$)/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minlenght: 6,
      maxlenght: 16,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: emailRegexp,
    },
    currentBalance: {
      type: String,
      default: 0,
    },
    accessToken: {
      type: String,
      default: ({ _id }) => {
        return jwt.sign({ id: _id }, ACCESS_TOKEN_SECRET_KEY, {
          expiresIn: '6h',
        });
      },
      // default: '',
    },
    refreshToken: {
      type: String,
      default: ({ _id }) => {
        return jwt.sign({ id: _id }, REFRESH_TOKEN_SECRET_KEY, {
          expiresIn: '3d',
        });
      },
      // default: '',
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSaveErr);

const signupSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(6).max(16).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const signinSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

// const currentBalance = Joi.object({
//   currentBalance: Joi.string().required(),
// });

const schemas = {
  signupSchema,
  signinSchema,
  refreshSchema,
  // currentBalance,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
