/**
 * author songwen
 * 单个补录弹窗
 * todo  这个页面中方法冗余太多... 工期太紧 先上..
 */
class InfoController {
  constructor($scope,NgTableParams,orderSvc,recordSvc,enumSvc,commonSvc,infoModalInstance) {
    'ngInject';
    /**
     * 注入的服务
     */
    this.scope = $scope;
    this.NgTableParams = NgTableParams;
    this.orderSvc = orderSvc;
    this.recordSvc = recordSvc;
    this.enumSvc = enumSvc;
    this.infoModalInstance  = infoModalInstance;
    this.commonSvc = commonSvc;
    this.idType = [];

    /**
     * 筛选项
     */
    this.filter = {
      idType:{
        key:1,
        value:'身份证'
      }
    };

    /**
     * 初始化函数 目前就干了一件事 获取证件类型枚举值
     */
    this.init();
  }

  /**
   * 证件类型 枚举值
   */
  init(){
    this.enumSvc
      .get({
        enumType:'idType'
      })
      .then(data=>{
        this.idType = this.idType.concat(data && data.idType && angular.isArray(data.idType) ? data.idType: []);
      });

    /**
     * 发货记录修改信息
     */
    if(this.addRecordStatus && this.addRecordStatus.type == 'editOrderInfo'){
      this.addRecordStatus.data.then(data=>{
        console.log('data',data);
        this.filter = data;
        this.filter.idType = {
          key:data.idType,
          value:data.idTypeText
        }
      });
    }

    /**
     * 兑奖记录
     */
    if(this.addRecordStatus && this.addRecordStatus.type == 'editUserInfo'){
      this.addRecordStatus.data.then(data=>{
        console.log('data',data);
        this.filter = data;
        this.filter.idType = {
          key:data.idType,
          value:data.idTypeText
        }
      });
    }
  }

  /**
   * 保存
   */
  save(){
    return this.orderSvc
      .additionalRecording({
        couponCode : this.filter.couponCode,
        mobileNumber : this.filter.mobileNumber,
        name : this.filter.name,
        idType : this.filter.idType.key,
        idNumber : this.filter.idNumber,
        shippingAddress : this.filter.shippingAddress
      })
      .then(data=>{
        this.infoModalInstance.instance.close(data);
      });
  }

  /**
   * 保存&继续
   */
  saveContinue(){
    return this.orderSvc
      .additionalRecording({
        couponCode : this.filter.couponCode,
        mobileNumber : this.filter.mobileNumber,
        name : this.filter.name,
        idType : this.filter.idType.key,
        idNumber : this.filter.idNumber,
        shippingAddress : this.filter.shippingAddress
      })
      .then(()=>{
        this.filter = {
          idType:{
            key:1,
            value:'身份证'
          }
        };
      });
  }


  /**
   * 编辑单个补录弹窗信息后，点击保存按钮，请求的接口
   */

  updateSave(){
    return this.orderSvc
      .sendProduct({
        id : this.filter.id,
        couponCode : this.filter.couponCode,
        mobileNumber : this.filter.mobileNumber,
        name : this.filter.name,
        idType : this.filter.idType.key,
        idNumber : this.filter.idNumber,
        shippingAddress : this.filter.shippingAddress
      })
      .then(data=>{
        this.infoModalInstance.instance.close(data);
      });
  }

  /**
   * 编辑单个补录弹窗信息后，点击保存&继续按钮，请求的接口
   */

  updateSaveContinue(){
    return this.orderSvc
      .sendProduct({
        id : this.filter.id,
        couponCode : this.filter.couponCode,
        mobileNumber : this.filter.mobileNumber,
        name : this.filter.name,
        idType : this.filter.idType.key,
        idNumber : this.filter.idNumber,
        shippingAddress : this.filter.shippingAddress
      })
      .then(()=>{
        this.filter = {
          idType:{
            key:1,
            value:'身份证'
          }
        };
      });
    }




  /**
   * 保存 兑奖用户信息
   */
  saveUserInfo(){
    return this.recordSvc
      .addExchange({
        couponCode : this.filter.couponCode,
        mobileNumber : this.filter.mobileNumber,
        name : this.filter.name,
        idType : this.filter.idType.key,
        idNumber : this.filter.idNumber
      })
      .then(data=>{
        this.infoModalInstance.instance.close(data);
      });
  }

  /**
   * 保存&继续  兑奖用户信息
   */
  saveContinueUserInfo(){
    return this.recordSvc
      .addExchange({
        couponCode : this.filter.couponCode,
        mobileNumber : this.filter.mobileNumber,
        name : this.filter.name,
        idType : this.filter.idType.key,
        idNumber : this.filter.idNumber
      })
      .then(()=>{
        this.filter = {
          idType:{
            key:1,
            value:'身份证'
          }
        };
      });
  }


  /**
   * 编辑
   * 编辑单个补录弹窗信息后，点击保存按钮，请求的接口  兑奖用户信息
   */
  updateSaveUserInfo(){
    return this.recordSvc
      .exchangeUpdate({
        id : this.filter.id,
        couponCode : this.filter.couponCode,
        mobileNumber : this.filter.mobileNumber,
        name : this.filter.name,
        idType : this.filter.idType.key,
        idNumber : this.filter.idNumber
      })
      .then(data=>{
        this.infoModalInstance.instance.close(data);
      });
  }

  /**
   *   应该没有保存继续  !!!!!! 应该没有保存继续  !!!!!! 应该没有保存继续  !!!!!!?????
   * 编辑单个补录弹窗信息后，点击保存&继续按钮，请求的接口  兑奖用户信息
   */

  updateSaveContinueUserInfo(){
    return this.recordSvc
      .exchangeUpdate({
        id : this.filter.id,
        couponCode : this.filter.couponCode,
        mobileNumber : this.filter.mobileNumber,
        name : this.filter.name,
        idType : this.filter.idType.key,
        idNumber : this.filter.idNumber
      })
      .then(()=>{
        this.filter = {
          idType:{
            key:1,
            value:'身份证'
          }
        };
      });
  }


  
  /**
   * 关闭
   */
  close(){
    //this.infoModalInstance.instance.dismiss('close');
    this.infoModalInstance.instance.close('');
  }

}

export default InfoController;
