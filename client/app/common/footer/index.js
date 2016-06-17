/**
 * @desc 组件入口
*/
import angular from 'angular';
import Component from './component';

let Module = angular.module('commonfooter', [
])
.component('commonfooter', Component);

export default Module;