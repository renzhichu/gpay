import api from './api';                   //这个以后要写成 node_module
import commonSvc from './commonSvc';       //基础服务
import enumSvc from './enumSvc';           //枚举服务
import orderSvc from './orderSvc';           //礼品服务
import appSvc from './appSvc';           //礼品服务

export default angular
  .module('app.services', [
      api.name
  ])
  .service({
    commonSvc,
    enumSvc,
    orderSvc,
    appSvc
  });
