/**
 * @desc 模块入口
*/
import angular from 'angular';
import component from './component';
import ngFileUpload from 'ng-file-upload';

let uploadModule = angular.module('inputupload', [
  ngFileUpload
])

.component('inputupload', component);

export default uploadModule;
