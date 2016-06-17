import outputComponent from './output.component';
import outputModalController from './output.controller';
export default angular.module('modalComponentOutput', [])
  .component('modalComponentOutput', outputComponent)
  .constant('outputModalInstance', {instance:null})
  .controller('outputModalController',outputModalController)



