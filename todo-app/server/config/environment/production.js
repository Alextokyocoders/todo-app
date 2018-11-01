'use strict';
import path from 'path';

/*configuration specific production*/
module['exports'] = {
  jwt_secret: `${process.env['SECRET']}jwtauthenticate-todo.prod_professional#2018`,
  mongodb: {
    server_config: {
      username: '',
      password: '',
      host: '',
      port: 27017
    },
    dbName: 'todo-prod',
  },
  port: 3000,
  imageStore: {
    host: 'todo-config-host',
    // production root is dist
    root: path.join(__dirname, '../../../../../', 'public/upload/todo-prod'),
    baseDir: '/public'
  },
  document: {
    docDev: path.join(__dirname, '../../../', 'docs/gen'),
    docApi: path.join(__dirname, '../../../', 'public')
  },
  /*time expire token*/
  timeTokenExpire: 24 * 60 * 60 * 3, //<=> 2day
  email: {
    timeExpireActive: 3 * 24 * 60 * 60, //3day
    keyValidateSendMail: 'fbaa80cbd1b313a80c5d8d8976zctv',
    mailJet: {
      mail: 'support@bixbyit.com'
    },
    domain_request: 'todo-config-host'
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