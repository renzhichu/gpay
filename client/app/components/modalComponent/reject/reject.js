import rejectComponent from './reject.component';
import rejectModalController from './reject.modal.controller';
export default angular.module('modalComponentReject',[])
  .component('modalComponentReject', rejectComponent)
  .constant('rejectModalInstance', {instance:null})
  .controller('rejectModalController',rejectModalController)

