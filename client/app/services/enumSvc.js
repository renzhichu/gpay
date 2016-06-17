/**
 * author liubingli
 * 枚举服务
 */
export default class enumSvc {
  constructor(Api){
    'ngInject';
    this.Api = Api;
  }

  /**
   * 获取各种枚举值
   */
  get(enumType){
    return this.Api.get('gift/enum',enumType);
  }

}