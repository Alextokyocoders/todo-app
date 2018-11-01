/**
 * @author: ManhNV
 * @description config environment dev and product
 * @create: 2017/02/15
 * @version 1.0.0
 */
'use strict';

import _ from 'lodash';
import path from 'path';

let all = {
  /*version api*/
  apiVersion: 'v1',

  node_env: process.env['NODE_ENV'],

  /*root path for server*/
  root: path.join(__dirname, '../../..'),

  /*set directory client-path*/
  clientPath: path.join(__dirname, '../../../client'),

  /*set directory server-path*/
  serverPath: path.join(__dirname, '../../../server'),

  /*Server port*/
  port: process.env['PORT'] || 8000,

  /*Path sync extension method*/
  syncExtensionMethod: path.normalize(path.join(__dirname, '../../../server/common/extension_methods/**/*.ext.js')),

  /*Server Ip*/
  ip: process.env['IP'] || '0.0.0.0',

  push_key_secret: `${process.env['SECRET']}mastersafehldfullx$%^#Xxweb`,

  aws_file_config: path.join(__dirname, '../other/aws.config.json'), // modifier aws-config.json

  mailgun: {
    api_key: 'key-97da0f53807970a73bfb79c28d0133d5',
    domain: 'safehold.xyz',
    mailOwner: 'postmaster@safehold.xyz'
  }
};

export default _.merge(
  all,
  require(`./${process.env['NODE_ENV']}.js` || './production.js')
);