/**
 * author liubingli
 * 商户订单相关接口
 */
export default class orderSvc {
  constructor(Api){
    'ngInject';
    this.Api = Api;
  }

  /**
   * 订单列表查询
   * @param params
   * @returns {*}
   */
   
  getList(params){
    return this.Api.get('order/list',params);
  }
  
}