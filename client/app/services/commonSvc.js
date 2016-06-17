/**
 * author liubingli
 * 公共服务
 */
export default class commonSvc {
  constructor(Api,Upload){
    'ngInject';
    this.Api = Api;
    this.Upload = Upload;
    this.userAuth = {};
  }

  /**
   * 角色获取 gift/currentEntity
   */
  getUserRole(){
    return this
      .Api
      .get('gift/currentEntity');
  }

  /**
   * 门店列表
   * 这个门店会根据用户权限的来定 如果是一条数据 直接拍到html页面
   */
  getStoreList(params){
    return this.Api.get('gift/getStore',params);
  }

  /**
   * 商圈广场列表
   */
  getPlazaList(params){
    return this.Api.get('gift/getPlaza',params);
  }

  /**
   * 上传服务
   */
  upload(options){
    return this
      .Upload
      .upload({
        url:'/System/files/ajaxImageUpload',
        data:options
      }).then(data=>{
        let status = data && data.status;
        if(status == 200){
          let uploadStatus = data && data.data && data.data.status,
              errorMsg = data && data.data && data.data.msg;
          if(uploadStatus != 200){
            console.log('错误信息',errorMsg);
            return;
          }else{
           return data && data.data;
          }
        }else{
          console.log('错误信息:',data);
        }
      });
  };
}