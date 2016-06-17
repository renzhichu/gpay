import _ from  'lodash';
/**
 * 门店组件里不介入业务  所有的业务逻辑拆出到业务中
 */
class StoreController {
  constructor($scope,$filter,commonSvc,gradeSvc,storeModalInstance) {
    'ngInject';

    /**
     * 注入的服务
     */
    this.$scope = $scope;
    this.$filter = $filter;
    this.commonSvc = commonSvc;
    this.gradeSvc = gradeSvc;
    this.storeModalInstance = storeModalInstance;

    /**
     * 业务的初始值
     */
    this.filterStore       = '';  //门店的检索值
    this.controlLevel      = [];  //管控级别
    this.stores            = [];  //左侧值
    this.curSelectedStores = [];  //左侧当前选中值
    this.allSelectedStores = [];  //右侧值
    this.selectedStores    = [];  //右侧当前选中值
    this.filter = {};
    this.init();


  }

  init(){
    /**
     * 当前默认选中的管控级别
     * @type {defaultLevel|{key, value}}
     */
    this.filter.controlLevel = this.storeinfo.defaultLevel;
    /**
     * 当前所有的管控级别
     */
    this.storeinfo.controlLevel.then(allControlLevel=>{
      this.controlLevel = this.storeinfo.firstVal.concat(allControlLevel && allControlLevel.controlLevel && angular.isArray(allControlLevel.controlLevel) ? allControlLevel.controlLevel:[]);
    });
    /**
     * 左侧所有值
     */
    this.storeinfo.stores.then(stores=>{
      this.stores = stores;
    });

    /**
     * 右侧所有值 todo
     */
    /**
     * 1/出库 add
     */
    if(this.storeinfo.type == 'output-add'){
      this.allSelectedStores = this.storeinfo.selectedStores;
    }
    /**
     *2/出库 detail
     */
    if(this.storeinfo.type == 'output-detail'){
      this.storeinfo.selectedStores.then(data=>{
        this.allSelectedStores = data && data.targetStores && angular.isArray(data.targetStores) ? data.targetStores: [];
      });
    }
    /**
     *3/管控级别 增加
     */
    if(this.storeinfo.type == 'control-add'){
      this.storeinfo.selectedStores.then(data=>{
        this.allSelectedStores = data && data.list && angular.isArray(data.list) ? data.list: [];

        /*
        var sourceData = data && data.list && angular.isArray(data.list) ? data.list: [];
        var allSelectedStores = [];
        //todo..服务端同学作统一
        angular.forEach(sourceData,(item)=>{
          allSelectedStores.push({
            storeId:item.storeId,
            storeName:item.storeViewName
          })
        });
        this.allSelectedStores = allSelectedStores;*/


      });
    }
  }
  
  /**
   * 管控级别筛选  (管控级别关联门店)
   */
  getStoreByControlLevel(){
    this.gradeSvc
      .gradeList({
        controlLevel:this.filter.controlLevel && this.filter.controlLevel.key
      })
      .then(data=>{
        /**
         * 管控级别
         */
        if(this.storeinfo.type == 'control-add'){
          this.allSelectedStores = data && data.list && angular.isArray(data.list) ? data.list: [];
          /*
          var sourceData = data && data.list && angular.isArray(data.list) ? data.list: [];
          var allSelectedStores = [];
          //todo..服务端同学作统一
          angular.forEach(sourceData,(item)=>{
            allSelectedStores.push({
              storeId:item.storeId,
              storeName:item.storeViewName
            })
          });
          this.allSelectedStores = allSelectedStores;*/
        }
        /**
         * 出库
         * @type {T}
         */
        if(this.storeinfo.type == 'output-add'){
          this.stores = data && data.list && angular.isArray(data.list) ? data.list: [];
          /*
          var sourceData = data && data.list && angular.isArray(data.list) ? data.list: [];
          var stores = [];
          //todo..服务端同学作统一
          angular.forEach(sourceData,(item)=>{
            stores.push({
              storeId:item.storeId,
              storeName:item.storeViewName
            })
          });
          this.stores  = stores;*/
        }
      })
  }
  
  /**
   * 根据门店名称检索
   */
  searchStore(){
    /**
     *
     */
    if(this.storeinfo.type == 'control-add'){
      this.commonSvc.getStoreList({isAll:1,storeName:this.filterStore.storeName}).then(allStores=>{
        return this.gradeSvc.gradeList({limit:-1}).then(levelStores=>{
          let lstores = levelStores && levelStores.list;
          this.stores = allStores.filter(item=>{
            return !lstores.map(oItem=>oItem['storeId']).includes((item['storeId']).toString());
          });
        });
      });
    }else{
      this.commonSvc
        .getStoreList({storeName:this.filterStore.storeName})
        .then(data=>{
          this.stores = data;
        })
    }
  }

  /**
   * 增加部分
   */
  addStores(){
    var allSelectedStores = this.allSelectedStores;
    if(allSelectedStores && allSelectedStores.length > 0){
      let addStores = _.filter(this.curSelectedStores,(item)=>{
        return _.findIndex(this.allSelectedStores,item) < 0 ;
      });
      angular.forEach(addStores,(item)=>{
        this.allSelectedStores.push(item);
      })
    }else{
      this.allSelectedStores = angular.copy(this.curSelectedStores);
    }
  }

  /**
   * 增加全部
   */
  addAllStores(){
    var allSelectedStores = this.allSelectedStores;
    if(allSelectedStores && allSelectedStores.length > 0){
      let addStores = _.filter(this.stores,(item)=>{
        return _.findIndex(this.allSelectedStores,item) < 0 ;
      });
      angular.forEach(addStores,(item)=>{
        this.allSelectedStores.push(item);
      })
    }else{
      this.allSelectedStores = angular.copy(this.stores);
    }
  }

  /**
   * 删除
   */
  delStores(){
    this.allSelectedStores = _.filter(this.allSelectedStores,(item)=>{
      return _.findIndex(this.selectedStores,item) < 0 ;
    });
  }

  /**
   * 删除全部
   */
  delAllStores(){
    this.allSelectedStores = [];
  }

  /**
   * 关闭弹窗
   */
  close(){
    this.storeModalInstance.instance.dismiss('close');
  }

  /**
   * 保存当前选中的门店
   */
  saveSelectedStores(){
    let allSelectedStores = this.allSelectedStores;
    this.storeModalInstance.instance.close(allSelectedStores);
  }

  /**
   * 获取所有门店ID
   */
  getStoreIds(){
    var storeIds = [];
    angular.forEach(this.allSelectedStores,item=>{
      if(item.storeId){
        storeIds.push(item.storeId);
      }
    });
    return storeIds;
  }

  /**
   * 设置管控级别
   */
  setStoreLevel() {
    let storeIds = this.getStoreIds();
    this.gradeSvc
      .batchGradeset({
        storeIds: angular.isArray(storeIds) ? angular.toJson(storeIds) : angular.toJson([]),
        controlLevel: this.filter.controlLevel && this.filter.controlLevel.key
      })
      .then(data=> {
        this.storeModalInstance.instance.close(data);
       // console.log('新增成功', data);
      })
  }
}

export default StoreController;
