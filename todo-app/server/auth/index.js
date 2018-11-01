'use strict';
import express from 'express';

exports.authService = require('./auth.service');
exports.expressJwtAuth = require('./expressJwt.service').expressJwtMiddleware;

const router = express.Router();
router.use('/', require('./local').default);

export default router;
