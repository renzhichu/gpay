/**
 * author songwen
 * 快递单录入弹窗
 */
class ExpressController {
  constructor($scope,NgTableParams,orderSvc,enumSvc,commonSvc,expressModalInstance) {
    'ngInject';
    /**
     * 注入的服务
     */
    this.scope = $scope;
    this.NgTableParams = NgTableParams;
    this.orderSvc = orderSvc;
    this.enumSvc = enumSvc;
    this.commonSvc = commonSvc;
    this.expressModalInstance = expressModalInstance;
    this.companyShortName = [];
    /**
     * 筛选项
     */
    this.filter = {
      companyShortName:{
        id:'1',
        companyShortName:'苏宁'
      }
    };
    
    /**
     * 初始化函数 目前就干了一件事 获取快递公司枚举值
     */
    this.init();
  }

  /**
   * 快递公司列表list
   */
  init(){
    /**
     * 编辑快递单信息
     */
        this.orderSvc
          .expressList()
          .then(data=> {
            this.companyShortName  = this.companyShortName.concat(data && data.list && angular.isArray(data.list) ? data.list: []);
            if(this.addExpressStatus && this.addExpressStatus.type == 'editLogisticInfo') {
              this.addExpressStatus.data.then(data=> {

                this.filter.id = data && data.id;
                //快递信息有值 回拍 无值情况 取快递单第一个
                //快递单号
                if(data && data.trackingNumber){
                  console.log('有快递单号');
                  this.filter.trackingNumber = data.trackingNumber;
                }
                //快递公司
                if(data && Boolean(Number(data.freightForwarderId))){
                  console.log('有值');
                  this.filter.companyShortName = {
                    id:data.freightForwarderId,
                    companyShortName:data.freightForwarderName
                  }
                }else{
                  console.log('无值');
                  //无值的情况直接回拍第一个值
                  this.filter.companyShortName =  {id:"1",companyShortName:"苏宁"}
                }
              });
            }
          });
  }

  /**
   * 确认发货
   */
  confirmSend(){
    this.orderSvc
      .addUpdateLogistic({
        id: this.filter.id,
  			freightForwarderId : this.filter.companyShortName.id,
  			trackingNumber : this.filter.trackingNumber
      })
      .then(data=>{
        this.expressModalInstance.instance.close(data);
      });
  }

  /**
   * 关闭
   */
  close(){
    this.expressModalInstance.instance.dismiss('close');
  }

}

export default ExpressController;
