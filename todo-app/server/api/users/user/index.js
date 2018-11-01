/**
 * @author ManhNV
 * @description admin api
 * @version 1.0.0
 * @create 2017/05/03
 */

import express from 'express';
import { UserController } from './user.controller';
import { uploadBase } from '../../../common/services/upload';

let router = express.Router();
let userController = new UserController();


const optionUpload = uploadBase.uploadFileBase.fields([
  { name: 'avatar', maxCount: 1 }
]);

//admin
router.get('/admin', userController.listAdmin);
router.put('/admin/:id', userController.updateAdmin);
router.put('/admin/lock/:id', userController.lock);

//user
router.get('/:id', userController.profile);
router.put('/:id', optionUpload, userController.update);
router.get('/', userController.list);
router.put('/password/change', userController.changePassword);
router.post('/password/forgot', userController.forgotPassword);
router.post('/email/send-verify', userController.sendVerify);
router.post('/email/verify', userController.verifyEmail);
router.get('/sms/resend', userController.resend);

export default router;
