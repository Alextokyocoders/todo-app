'use strict';

/*configuration specific production*/
import path from "path";

module['exports'] = {
  jwt_secret: `${process.env['SECRET']}jwtauthenticate-safehold.test_professional#2018`,
  mongodb: {
    server_config: {
      username: '',
      password: '',
      host: '',
      port: 27017
    },
    dbName: 'safehold-dev',
  },
  port: 8181,
  imageStore: {
    host: 'http://localhost',
    root: path.join(__dirname, '../../../../', 'public/upload/safehold-dev'),
    baseDir: '/public'
  },
  document: {
    docDev: path.join(__dirname, '../../../', 'dist/docs/gen'),
    docApi: path.join(__dirname, '../../../', 'dist/public')
  },
  /*time expire token*/
  timeTokenExpire: 24 * 60 * 60 * 3, //<=> 3day
  email: {
    timeExpireActive: 3 * 24 * 60 * 60, //3day
    keyValidateSendMail: 'fbaa80cbd1b313a80c5d8d8976zctv',
    mailJet: {
      mail: 'support@bixbyit.com'
    },
    domain_request: 'http://dev.vmodev.com'
  },
  notification: {
    ios: {
      key: 'safehold_key.p8',
      keyId: 'RBR8VJDM2D',
      teamId: '5KH4V6747U',
      bundleId: 'com.safehold'
    },
    android: {
      android_api_key: '',
      project_id: '',
      request_options: undefined
    }
  }
};
