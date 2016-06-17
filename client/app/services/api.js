export default angular
  .module('app.api', [])
  .factory('Api', function($http,$q,$httpParamSerializerJQLike){
    "ngInject";
    var api = {};

    var basePath = function(){
      return 'http://127.0.0.1:30785/guofu/';
    }

    api.get = function(url,params){
      var deferred = $q.defer();
      $http({
        url   : basePath()+url,
        method: 'get',
        params: params || {}
      }).then(function(baseResult){
        var result = baseResult.data;
        if(result.status === 200){
          console.log('请求正常返回~');
          deferred.resolve(result.data);
        }else{
          //todo...这里也是简单处理之 直接把异常信息和状态 返回给业务
          //是否需要弹出没有登录、没有权限相关信息？统一处理？
          console.log('非200状态~');
          var resultMsg = result && result.msg;
          if(typeof (resultMsg)  == 'string'){
            alert(resultMsg.replace(/&amp;/g, '&'));
          }

          //alert("状态码:"+result.status+"错误信息:"+result.msg);
          deferred.reject("状态码:"+result.status+"错误信息:"+result.msg);
        }
      },function(baseResult){
        var httpError = "httpError~";
        console && console.log(httpError);
        deferred.reject(httpError+":"+baseResult.status+","+baseResult.statusText);
      })
      return deferred.promise;
    };

    api.post = function(url,params){

      var deferred = $q.defer();

      $http({
        url    : basePath()+url,
        data   : $httpParamSerializerJQLike(params),
        method : "post",
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
      }).then(function (baseResult) {
        var result = baseResult.data;
        if(result.status === 200) {
          console.log('请求正常返回~');
          deferred.resolve(result.data);
        }else {
          console.log('非200状态~',result.status+"错误信息:"+result.msg);
          var resultMsg = result && result.msg;
          if(typeof (resultMsg)  == 'string'){
            alert(resultMsg.replace(/&amp;/g, '&'));
          }
          //alert("状态码:"+result.status+"错误信息:"+result.msg);
          deferred.reject("状态码:"+result.status+"错误信息:"+result.msg);
        }
      },function (baseResult) {
        var httpError = "httpError~";
        console && console.log(httpError);
        deferred.reject(httpError+":"+baseResult.status+","+baseResult.statusText);
      });

      return deferred.promise;

    };

    return api;

  })