
import expressComponent from './express.component';
import expressModalController from './express.modal.controller';
export default angular.module('modalComponentExpress',[])
  .component('modalComponentExpress', expressComponent)
  .constant('expressModalInstance', {instance:null})
  .controller('expressModalController',expressModalController)


