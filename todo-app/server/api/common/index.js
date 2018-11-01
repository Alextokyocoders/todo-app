import express from 'express';
import * as commonCtrl from './common.controller';

const router = express.Router();

router.get('/state', commonCtrl.getState);

export default router;