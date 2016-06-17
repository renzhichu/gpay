class GiftController {
  constructor($scope,NgTableParams,giftModalInstance,giftSvc,commonSvc) {
    'ngInject';
    /**
     * 注入服务
     */
    this.NgTableParams = NgTableParams;
    this.giftModalInstance = giftModalInstance;
    this.giftSvc = giftSvc;
    this.commonSvc = commonSvc;
    this.$scope = $scope;
    /**
     *筛选项
     */
    this.filter = {};

    /**
     * 当前选中的礼物
     */
    this.init();
  }

  /**
   * 初始化值
   */
  init(){
    this.tableParams = new this.NgTableParams({
      count:20 //每页几条
    }, {
      getData: params => {
        this.isAllSelected = false;  //翻页的时候全选不选状态
        let formData = angular.extend(this.getSearchFormData() || {},{offset:((params.url().page)-1)*params.count()},{limit:params.count()})
        return this.giftSvc
          .getList(formData)
          .then(data => {
            params.total((data && data.totalCount)|| 1); //帮你分几页
            return (data && this.setGiftSelected(data['list'])) || [];
          });
      }
    });
  }

  /**
   * 礼品全选
   */
  toggleAll(){
    var toggleStatus = !this.isAllSelected;
    angular.forEach(this.tableParams['data'], (item)=>{
      item.selected = !toggleStatus;
    });
  }

  /**
   * 单个选择
   */
  optionToggled(){
    this.isAllSelected = this.tableParams['data'].every((item)=>{
      return item.selected;
    })
  }

  /**
   * 把每个selected值撸一遍
   * @param data
   */
  setGiftSelected(data){
    angular.forEach(data,(item)=>{
      item.selected = false;
    })
    return data;
  }

  /**
   * 礼品检索
   */
  searchList(){
    let params = this.getSearchFormData();
    this.tableParams.parameters(params).reload();
  }

  /**
   * 遍历下selected == true的全部掳走
   */
  getSelectedGift(){
    var gifts = [];
    angular.forEach(this.tableParams['data'],item=>{
      if(item.selected){
        gifts.push(item);
      }
    })
    return gifts;
  }

  /**
   * 点击确定按钮 / 关闭
   */
  save(){
    let gifts = this.getSelectedGift();
    if(gifts.length == 0){
      alert('请至少选择一个礼品');
      return;
    }
    this.giftModalInstance.instance.close(gifts);
  }

  /**
   * @returns {{}} form数据集合
   */
  getSearchFormData() {
    let filter = this.filter,
        formData = {
          status:1,
          limit:20
        };
    
    //出库的情况..
    if(this.stockStatus && this.stockStatus.type == 'output'){
      formData.type = 3;
    }
    //礼品入库的时候
    if(this.stockStatus && this.stockStatus.entityType == 3){
      formData.type = 2;
    }
    //礼品编号
    filter.giftId ?  formData.giftId = filter.giftId: '';
    //礼品名称
    filter.giftName ?  formData.giftName = filter.giftName: '';
    return formData;
  }

  /**
   * 关闭
   */
  close(){
    this.giftModalInstance.instance.dismiss('close');
  }
}

export default GiftController;
