import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import uibs from 'angular-ui-bootstrap';
import ngMessages from 'angular-messages';
import ffanNgtable from 'ffan-ng-table';
import ngFileUpload from 'ng-file-upload';
import 'jquery';
import 'bootstrap';
import 'angular-bootstrap-datetimepicker';
import 'angular-bootstrap-datetimepicker/src/css/datetimepicker.css';
import 'angular-bootstrap-datetimepicker/src/js/datetimepicker.templates';
import './lib/bootstrap.css';
import './lib/bootstrap-theme.css';
import './lib/select.css';
import './lib/font-awesome/css/font-awesome.css';
import './lib/angular-busy.css';

angular.module('app', [
  ngMessages,
  ffanNgtable.name,
  'ui.bootstrap.datetimepicker',
  ngFileUpload,
  uiRouter,
  Common.name,
  uibs,
  Components.name
])

.constant('$menuConstant', {
  DEBUG: process.env.DEBUG
})

.component('app', AppComponent);
