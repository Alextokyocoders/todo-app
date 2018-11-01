'use strict';

import chalk from 'chalk';
import path from 'path';
import glob from 'glob';
import config from '../config/environment';

/**
 * @description Preload Extension methods
 */
function preLoadExtension() {
  let extensions = glob.sync(path.normalize(config.syncExtensionMethod));
  extensions.forEach(ext => {
    let extName = require(ext);
    console.info(chalk.blue(`Extension methods of "${extName}" has applied!`));
  });
}

exports.Bootstrapping = function () {
  preLoadExtension();
};
