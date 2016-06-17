import listComponent from './component';
export default angular.module('orderList', [])
.config(($stateProvider) => {
"ngInject";
$stateProvider.state('orderlist', {
  url: '/order/list',
  template: '<orderlist></orderlist>'
});
})
.component('orderlist', listComponent)
.filter('fromText', function() {
  return function(fromType) {
  	return ['IOS', 'Android'][fromType];
  }   
})
.filter('payStatusText', function() {
  return function(payStatus) {
  	return ['未支付', '已支付', '支付失败'][payStatus];
  }   
})
.filter('refundStatusText', function() {
  return function(refundStatus) {
  	return ['无退款', '有退款'][refundStatus];
  }   
});