/**
 * @desc 组件入口
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './component';
import Servie from './service';

let Module = angular.module('<%= parent %><%= name %>', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('<%= name %>', {
    url: '/<%= name %>',
    template: 'ok'
  });
})
.component('<%= parent %><%= name %>', Component)
.service('<%= name %>Service', Servie);

export default Module;