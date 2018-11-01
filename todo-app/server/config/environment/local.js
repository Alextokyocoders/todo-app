'use strict';

/*configuration specific production*/
import path from "path";

module['exports'] = {
  jwt_secret: `${process.env['SECRET']}jwtauthenticate-safehold.dev_professional#2018`,
  mongodb: {
    server_config: {
      username: 'todo-app',
      password: '123456a@',
      host: 'db.bicyclebluebook.com',
      port: 27017
    },
    dbName: 'todo-app',
  },
  port: 8888,
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
  timeTokenExpire: 24 * 60 * 60 * 30, // 30 days
  email: {
    timeExpireActive: 3 * 24 * 60 * 60, //3day
    keyValidateSendMail: 'fbaa80cbd1b313a80c5d8d8976zctv',
    mailJet: {
      mail: 'support@bixbyit.com'
    },
    domain_request: 'http://localhost:4200'
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
  },
  sms: {
    accountId: "ACe4ede5c6a54b63975b65fb68347c970f",
    accountToken: "bb3bae3ccdbde2e0b2ac7d65acd7801a"
  }
};
