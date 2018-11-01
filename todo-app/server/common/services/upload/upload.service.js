/**
 * @author ManhNV
 * @description upload base service
 */

import multer from 'multer';
import path from 'path';
import config from '../../../config/environment';
import fs from 'fs';

let disStorageMultiple = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathUpload = config.imageStore.root;
    return cb(null, pathUpload);
  },
  filename: function (req, file, cb) {
    return cb(null, Date.now() + file.originalname);
  }
});

/**
 * @method deleteFromFile
 * @description delete file from server
 * @param arrKey
 */
function deleteFromFile(arrKey) {
  if ('string' === typeof arrKey) {
    arrKey = [arrKey];
  }
  arrKey.forEach(key => {
    fs['unlink'](path.join(config.imageStore.root, key), () => {
      console.log(`Delete file success: ${key}`);
    });
  });
}

/**
 * @method removeFileUpload
 * @description remove file upload when exception api call
 * @param req
 */
function removeFileUpload(req) {
  let arrKey = [];
  for (let key in req.files) {
    for (const imageKey of req.files[key]) {
      arrKey = arrKey.concat(imageKey['filename']);
    }
  }
  deleteFromFile(arrKey);
}

exports.uploadBase = {
  uploadFileBase: multer({storage: disStorageMultiple}),
  deleteFile: deleteFromFile,
  removeFileUpload: removeFileUpload
};
