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
      .get('currentEntity');
  }

  /**
   * 上传服务
   */
  upload(options){
    return this
      .Upload
      .upload({
        url: this.Api.basePath + 'ajaxImageUpload',
        data:options,
        withCredentials: true,
        crossDomain: true,
      }).then(data=>{
        let status = data && data.status;
        if(status == 200){
          let uploadData = data.data,
              uploadStatus = uploadData && uploadData.status,
              errorMsg = uploadData && uploadData.msg;
          if(uploadStatus != 200){
            console.log('错误信息',errorMsg);
            return;
          }else{
           return uploadData && uploadData.data;
          }
        }else{
          console.log('错误信息:',data);
        }
      });
  };
}