/**
 * 应入库礼品
 */
import moment from 'moment';
class OutputController {
  constructor($scope,NgTableParams,outputModalInstance,stockSvc,enumSvc,giftSvc) {
    'ngInject';
    /**
     * 注入服务
     */
    this.NgTableParams = NgTableParams;
    this.outputModalInstance = outputModalInstance;
    this.stockSvc = stockSvc;
    this.giftSvc = giftSvc;
    this.enumSvc = enumSvc;
    this.$scope = $scope;
    this.isStorageIn = [{key:'',value:'全部'}];

    /**
     *筛选项
     */
    this.filter = {
      isStorageIn:{
        key:'1',
        value:'未入库'
      }
    };

    this.init();
  }

  /**
   * 初始化值
   */
  init(){

    /**
     * 入库状态
     */
    this.enumSvc
      .get({
        enumType:'isStorageIn'
      })
      .then(data=>{
        this.isStorageIn = this.isStorageIn.concat(data && data.isStorageIn && angular.isArray(data.isStorageIn) ? data.isStorageIn:[]);
      });

    this.tableParams = new this.NgTableParams({
      count:20 //每页几条
    }, {
      getData: params => {
        let formData = angular.extend(this.getSearchFormData() || {},{offset:((params.url().page)-1)*params.count()},{limit:params.count()});
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
    });
    return data;
  }

  /**
   * 检测起时间
   */
  checkFromTime(newTime){
    let fromTime = moment(newTime,"YYYY-MM-DD HH:mm:ss").unix(),
        toTime   = moment(this.filter.storageOutDateTo,"YYYY-MM-DD HH:mm:ss").unix();
    if(fromTime > toTime){
      alert("前者时间不能大于后者");
        this.filter.storageOutDateFrom = '';
    }
  }

  /**
   * 检测止时间
   */
  checkToTime(newTime){
    let toTime = moment(newTime,"YYYY-MM-DD HH:mm:ss").unix(),
     fromTime   = moment(this.filter.storageOutDateFrom,"YYYY-MM-DD HH:mm:ss").unix();
    if(toTime < fromTime){
      alert("后者时间不能小于后者");
      this.filter.storageOutDateTo = '';
    }
  }

  /**
   * 入库状态
   */
  changeStorageIn(){
    this.searchGift();
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
    });
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
    this.outputModalInstance.instance.close(gifts);
  }

  /**
   * 礼品数据设置
   */
  setGiftList(list){
    angular.forEach(list,(item,index)=>{
      item.checked = !item.checked;
    })
    return list;
  }

  /**
   * @returns {{}} form数据集合
   */
  getSearchFormData() {
    let filter = this.filter,
        formData = {
          limit:20,
          type:4
        };
    /**
     * 入库开始时间
     */
    filter.storageOutDateFrom ? formData.storageOutDateFrom = moment(filter.storageOutDateFrom,'YYYY-MM-DD HH:mm:ss').unix() : '';
    /**
     *
     *入库截止时间
     */
    filter.storageOutDateTo ?formData.storageOutDateTo =  moment(filter.storageOutDateTo,'YYYY-MM-DD HH:mm:ss').unix() : '';
    /**
     * 入库状态
     */
    filter.isStorageIn ? formData.isStorageIn = filter.isStorageIn.key : '';
    /**
     * 礼品编号
     */
    filter.giftId ?  formData.giftId = filter.giftId: '';
    /**
     * 礼品名称
     */
    filter.giftName ?  formData.giftName = filter.giftName: '';
    return formData;
  }

  /**
   * 礼品检索
   */
  searchGift(){
    let params = angular.extend(this.getSearchFormData() || {},{offset:0});
    this.tableParams.parameters(params).reload();
  }

  /**
   * 关闭
   */
  close(){
    this.outputModalInstance.instance.dismiss('close');
  }
}

export default OutputController;
