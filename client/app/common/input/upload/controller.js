/**
 * @desc 定义controller
 * 通过类的方式声明一个controller,scope是独立的
*/
class Controller {
  /**
   * @desc 构造函数
   * 在参数里声明，依赖会被自动注入
   * @return null { Null }
  */
  constructor($scope, $location, Upload, $attrs, appService) {
  	'ngInject';

    var vm = this;

    vm.name = 'inputUpload';
    vm.upload = Upload;
    vm.nameVal = $attrs['name'] || "file";
    vm.picMax = $attrs['picMax'] || 1;
    vm.required = $attrs['required'] || 0;
    vm.showTip = $attrs['showTip'] || 0;

    vm.imageBox = {
      "isShow": 0,
      "imagesrc": null
    }

    vm.siteConfig = appService.siteConfig();
  }

  uploadFile(file, errFile) {
    //console.log(file, errFile);
    let errInfo = this.catchErrFileError(errFile);
    if(errInfo && errInfo['data']){
      alert(errInfo && errInfo['msg']);
      return;
    }
    if (!!file) {
      // let options = {
      //   fileName:file,
      //   fileSize: 5242880,
      //   fileType:angular.toJson(['jpg','jpeg','png']),
      //   width:file && file.$ngfWidth,
      //   height:file && file.$ngfHeight,
      //   minWidth:640,
      //   minHeight:640
      // };
      let options = {
        fileName:file
      }

      return this.upload.upload({
        url: '/upload?target='+this.nameVal,
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
      }).then(response=>{
        if(response && response.data && response.data.url){
          this.formPics.push(response.data.url);
        }
      });
    }
  }

  catchErrFileError(errFile){

    //上传数量总线制
    if(this.formPics && this.formPics.length >= this.picMax){
      return {
        data:true,
        msg:'上传图片最大数量为'+this.picMax+'张'
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

  removePic(e, index){
    if(confirm("确定要移除此图片吗？")){
      this.formPics.splice(index, 1);
    }
    e && e.stopImmediatePropagation();
  }

  viewLarge(path){
    this.imageBox.isShow = 1;
    this.imageBox.imagesrc = path;
  }

  closeLargeView(){
    this.imageBox.isShow = 0;
    this.imageBox.imagesrc = null;
  }
}

export default Controller;
