/**
 * 弹窗组件的模块的引入
 * @type {module|angular.Module}
 */
import modalComponent from './modalComponent/component';

/**
 * 数据服务层
 */
import services from '../services/services';

/**
 * 业务
 */
import orderList from './order/list';                          //订单列表
import appAdd from './app/add';                             //增加订阅

export default  angular.module('app.order', [
    modalComponent.name,
    services.name,
    appAdd.name,
    orderList.name
]);