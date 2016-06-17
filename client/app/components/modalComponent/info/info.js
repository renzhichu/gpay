import infoComponent from './info.component';
import infoModalController from './info.modal.controller';
export default angular.module('modalComponentInfo',[])
  .component('modalComponentInfo', infoComponent)
  .constant('infoModalInstance', {instance:null})
  .controller('infoModalController',infoModalController)


