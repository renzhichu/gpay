/**
 * @desc 模块入口
*/
import angular from 'angular';
import component from './component';

let errorModule = angular.module('errormsg', [])

.component('errormsg', component);

export default errorModule;
