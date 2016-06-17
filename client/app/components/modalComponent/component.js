/**
 * 各种弹窗组件
 */
import gift from './gift/gift';
import output from './output/output';
import reject from './reject/reject';
import relevance from './relevance/relevance';
import store from './store/store';
import express from './express/express';
import info from './info/info';

export default angular.module('app.modal',[
    gift.name,
    output.name,
    reject.name,
    relevance.name,
    store.name,
    express.name,
    info.name
])







