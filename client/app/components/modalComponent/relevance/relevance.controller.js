class RelevanceController {
  constructor(relevanceModalInstance,enumSvc,relevanceSvc) {
    'ngInject';
    /**
     * 依赖的注入
     */
    this.relevanceModalInstance = relevanceModalInstance;
    this.enumSvc = enumSvc;
    this.relevanceSvc = relevanceSvc;
    /**
     *初始值的设置
     * @type {{couponStatus: {key: number, value: string}}}
     */
    this.relevance = {
      couponStatus:{
        key:1,
        value:'有效'
      }
    }
    this.init();
  }

  /**
   * 初始化关联的状态
   */
  init(){
    this.enumSvc
      .get({
        enumType:'couponBindingStatus'
      })
      .then(data=>{
        this.couponStatus = data && data.couponBindingStatus;
        /**
         * 新增的情况第一次需要把无效的状态干掉
         */
        !this.relevanceid ? this.couponStatus.splice(1,1): '';
      })

    /**
     * 编辑的情况赋值
     */
    if(this.relevanceid){
      this.relevanceSvc
        .bindInfo({id:this.relevanceid})
        .then(data=>{
          this.relevance = angular.copy(data);
          this.relevance.couponStatus = {
            key:data && data.status,
            value:(data && data.statusText) || '有效'
          }
          this.relevance.isCollectClaimPersonInfo = data && data.isCollectClaimPersonInfo &&  data && data.isCollectClaimPersonInfo.value;
          this.relevance.isCollectShippingInfo = data && data.isCollectShippingInfo &&  data && data.isCollectShippingInfo.value;
        });
    }
  }

  /**
   * 关联优惠券ID  修改关联
   */
  relevanceCoupon(){
    let params = this.relevance;
    params.status = params.couponStatus && params.couponStatus.key;

    /**
     *编辑的情况
     */
    if(this.relevanceid){
      this.relevanceSvc
        .bindUpdate(params)
        .then(data=>{
          alert('修改关联成功');
          this.relevanceModalInstance.instance.close(data);
        });
    }else{
      this.relevanceSvc
        .bind(params)
        .then(data=>{
          alert('关联成功');
          this.relevanceModalInstance.instance.close(data);
        });
    }
  }

  /**
   * 关闭弹窗
   */
  close(){
    this.relevanceModalInstance.instance.dismiss('close');
  }
}

export default RelevanceController;
