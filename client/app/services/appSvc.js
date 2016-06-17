/**
 * author liubingli
 * 应用相关接口
 */
export default class appSvc {
  constructor(Api){
    'ngInject';
    this.Api = Api;
  }

  /**
   * 创建应用
   * @param params
   * @returns {*}
   */
   
  add(params){
    return this.Api.post('app/add',params);
  }
  
}