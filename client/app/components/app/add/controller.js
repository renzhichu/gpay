/**
 * author liubingli
 * 订单增加
 */
class AddController {
  constructor($scope,$location,orderSvc,commonSvc,enumSvc) {
    'ngInject';
    /**
     * 注入依赖的服务
     */
    this.$scope    = $scope;
    this.$location = $location;
    this.orderSvc   = orderSvc;
    this.enumSvc  = enumSvc;
    this.commonSvc = commonSvc;

    this.sceneEnum = [{
      key: 0,
      value: '全部' 
    },{
      key: 1,
      value: 'IOS' 
    },{
      key: 2,
      value: 'Android' 
    }]

    this.appTypeEnum = [{
      key: 0,
      value: '电商类' 
    },{
      key: 1,
      value: '实体类' 
    },{
      key: 2,
      value: '个体类' 
    }]

   //初始化礼品状态/礼品单位
   this.init();
  }

  /**
   * 初始化一些 礼品状态 礼品单位
   */
  init(){

    this.resetForm();

    this.enumSvc
      .get({
        enumType:'giftStatus'
      })
      .then(data=>{
        this.giftStatus = data && data.giftStatus;
      })

    this.enumSvc
      .get({
        enumType:'giftUnit'
      })
      .then(data=>{
        this.giftUnit = data && data.giftUnit;
      })
  }

  /**
   * 图片上传前端错误catch
   * todo.. 放在这里不是很帅..
   */
  catchErrFileError(errFile){

    //上传数量总线制
    if(this.giftInfo.pics && this.giftInfo.pics.length>4){
      return {
        data:true,
        msg:'上传图片最大数量为5张'
      }
    }

    //本身错误信息
    let errInfo = {
      data:false,
      msg:''
    };
    if(errFile && errFile.length >0){
      switch(errFile[0]['$error']){
        case 'pattern':
          errInfo = {
            data:true,
            msg:'上传的图片类型只能是 jpg,jpeg,png'
          };
          break;
        case 'minWidth':
          errInfo = {
            data:true,
            msg:'上传的图片最小宽高为 640*640'
          };
          break;
        case 'minHeight':
          errInfo = {
            data:true,
            msg:'上传的图片最小宽高为 640*640'
          };
          break;
        case 'maxSize':
          errInfo = {
            data:true,
            msg:'上传图片最大的值为5M'
          };
          break;
        default:
          break;
      }
      return errInfo;
    }
  }

  /**
   * 上传图片
   */
  uploadFile(file, errFile){
    /**
     * 上传图片规则异常处理
     * return {{粗暴弹出错误信息}}
     */
    let errInfo = this.catchErrFileError(errFile);
    if(errInfo && errInfo['data']){
      alert(errInfo && errInfo['msg']);
      return;
    }

    if (!!file) {
      let options = {
        fileName:file,
        fileSize: 5242880,
        fileType:angular.toJson(['jpg','jpeg','png']),
        width:file && file.$ngfWidth,
        height:file && file.$ngfHeight,
        minWidth:640,
        minHeight:640
      };

      this.commonSvc
        .upload(options)
        .then(response=>{
          if(response){
            this.giftInfo.pics.push({
              src:response && response.data && response.data.url
            });
          }
        });
    };
  };

  /**
   * 左侧移动
   * @param curIndex
   */
  offsetLeft(curIndex){
    let curVal = this.giftInfo.pics[curIndex];
    if(curIndex == 0 ){
      let nextVal = this.giftInfo.pics[this.giftInfo.pics.length - 1];
      this.giftInfo.pics[curIndex] =  nextVal;
      this.giftInfo.pics[this.giftInfo.pics.length - 1]  =  curVal;
    }else{
      let nextVal = this.giftInfo.pics[curIndex - 1];
      this.giftInfo.pics[curIndex - 1] =  curVal;
      this.giftInfo.pics[curIndex]     =  nextVal;
    }
  }

  /**
   * 右侧移动
   * @param curIndex
   */
  offsetRight(curIndex) {
    let curVal =this.giftInfo.pics[curIndex];
    if(curIndex + 1 == (this.giftInfo.pics && this.giftInfo.pics.length)){
      let nextVal = this.giftInfo.pics[0];
      this.giftInfo.pics[0] =  curVal;
      this.giftInfo.pics[curIndex]     =  nextVal;
    }else{
      let nextVal = this.giftInfo.pics[curIndex + 1];
      this.giftInfo.pics[curIndex + 1] =  curVal;
      this.giftInfo.pics[curIndex]     =  nextVal;
    }
  }

  /**
   * 删除一个
   * @param curIndex
   */
  delCur(curIndex){
    this.giftInfo.pics.splice(curIndex,1);
  }

  /**
   * 上传图片的参数
   * @returns {Array}
     */
  setPicsParams(){
    let pics = this.giftInfo.pics,
        picsName = [];
    angular.forEach(pics,(item)=>{
      let url = item && item.src,
          picsLength = (url.split('/')).length;
      picsName.push(url.split('/')[picsLength - 1]);
    })
    return picsName;
  }
  
  /**
   * 取消 回到列表页
   */
  resetForm(){

    /**
     * 表单信息
     * @type {Array}
     */
    this.formData = {
      appId: '201601261141th1236548fc997',
      secretKey: '5577777',
      name: '',
      appType: 1,
      description: '',
      scene: 0
    };
  }

  /**
   * 增加礼品
   */
  add(){
    let params = angular.extend(angular.copy(this.giftInfo) || {},
      {
        pics:angular.toJson(this.setPicsParams())
      },
      {
        unit: this.giftInfo.unit && this.giftInfo.unit['key'] || ''
      },
      {
        status:this.giftInfo.status && this.giftInfo.status.key || ''
      } 
    );
    this.giftSvc
      .add(params)
      .then(()=>{
        alert('添加成功');
        this.$location.url('/gift/list');
      });
  }
}
export default AddController;
