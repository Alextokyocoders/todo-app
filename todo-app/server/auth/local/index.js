import express from 'express';
import {LocalController} from './local.controller';

const router = express.Router();
const localCtrl = new LocalController();

router.post('/register', localCtrl.register);
router.post('/login', localCtrl.authenticate);
router.post('/admin/login', localCtrl.adminLogin);

export default router;
