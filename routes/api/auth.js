const express = require('express');

const ctrl = require('../../controllers/auth');

const { ctrlWrapp } = require('../../helpers');

const { validBody, authenticate } = require('../../middlewares');

const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/signup', validBody(schemas.signupSchema), ctrlWrapp(ctrl.signup));

router.post('/signin', validBody(schemas.signinSchema), ctrlWrapp(ctrl.signin));

router.get('/current', authenticate, ctrlWrapp(ctrl.current));

router.get('/logout', authenticate, ctrlWrapp(ctrl.logout));

router.post(
  '/refresh',
  validBody(schemas.refreshSchema),
  ctrlWrapp(ctrl.refresh)
);

module.exports = router;
