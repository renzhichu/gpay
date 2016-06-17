/**
 * @file js任务用到的配置
 */
import path from 'path';

import globalConfig from './global';
const basePath = globalConfig.basePath;

var config = {
  src: path.join(basePath, '**/*.js')
};

module.exports = config;