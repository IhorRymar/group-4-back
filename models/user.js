const jwt = require('jsonwebtoken');
const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleSaveErr } = require('../helpers');

const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = process.env;

const emailRegexp = /^[a-zA-Z0-9._-]{2,63}@[a-zA-Z0-9.]+\.[a-zA-Z0-9.]{2,}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      maxlenght: 12,
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
      maxlenght: 63,
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
    },
    refreshToken: {
      type: String,
      default: ({ _id }) => {
        return jwt.sign({ id: _id }, REFRESH_TOKEN_SECRET_KEY, {
          expiresIn: '3d',
        });
      },
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSaveErr);

const signupSchema = Joi.object({
  name: Joi.string().max(12).required(),
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

const schemas = {
  signupSchema,
  signinSchema,
  refreshSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
