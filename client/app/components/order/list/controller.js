/**
 * author liubingli
 * 订单管理列表
 */
class ListController {
  constructor($scope,NgTableParams,orderSvc,enumSvc,commonSvc) {
    'ngInject';
    /**
     * 注入的服务
     */
    this.scope = $scope;
    this.NgTableParams = NgTableParams;
    this.orderSvc = orderSvc;
    this.enumSvc = enumSvc;
    this.commonSvc = commonSvc;

    this.payStatusEnum =  [
      {key:0,value:'全部'},
      {key:1,value:'已支付'},
      {key:2,value:'未支付'}
    ];
    this.refundStatusEnum =  [
      {key:0,value:'全部'},
      {key:1,value:'有退款'},
      {key:2,value:'无退款'}
    ];

    /**
     * 当前用户角色
     * @type {string}
     **/
    this.userAuth = {};
    this.entityId = '';
    this.entityType = '';

    /**
     * 初始化函数 目前就干了一件事 拉取礼品状态
     */
    this.init();

  }

  /**
   * 礼品状态 枚举值
   */
  init(){

    this.resetForm();

    // 权限控制示例
    this.commonSvc
      .getUserRole()
      .then(data=>{
        this.userAuth = data && data;
        this.entityId = data && data.entityId;
        this.entityType = data && data.entityType;
      })

    // 拉取列表
    this.searchList();
  }

  /**
   * suggesion用法示例
   */
  getSugList(storename){
   return this.commonSvc
     .getStoreList({
       storeName:storename
     })
     .then(data=>{
       return data;
     });
  }

  /**
   * 查询 
   */
  searchList(){
    this.tableParams = new this.NgTableParams({
      count:20
    }, {
      getData: params => {
        let formData = angular.extend(this.getSearchFormData() || {},{offset:((params.url().page)-1)*params.count()},{limit:params.count()});
        return this.orderSvc
          .getList(formData)
          .then(data => {
            console.log(data)
            params.total((data && data.totalCount)|| 1); //帮你分几页
            return (data && data['list']) || [];
          });
      }
    });
  }

  /**
   * @returns {{}} form数据集合
   */
  getSearchFormData() {
    let filter = this.filter,
        formData = {
          limit:20,
          type:1
        };

    //渠道筛选项
    if (filter.from) {
      formData.from = filter.from;
    }

    //订单支付状态筛选项
    if (filter.payStatus) {
      formData.payStatus = filter.payStatus;
    }

    //订单退款状态筛选项
    if (filter.refundStatus) {
      formData.refundStatus = filter.refundStatus;
    }

    return formData;
  }

  /**
   * 重置
   */
  resetForm(){
    this.filter = {
      payStatus: 0,
      refundStatus: 0
    };
  }
}

export default ListController;
