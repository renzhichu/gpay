import giftComponent from './gift.component';
import giftModalController from './gift.modal.controller';
export default angular.module('modalComponentGift',[])
  .component('modalComponentGift', giftComponent)
  .constant('giftModalInstance', {instance:null})
  .controller('giftModalController',giftModalController)

