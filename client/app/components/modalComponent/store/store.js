import storeComponent from './store.component';
import storeModalController from './store.modal.controller';
export default angular.module('modalComponentStore',[])
 .component('modalComponentStore', storeComponent)
 .constant('storeModalInstance', {instance:null})
 .controller('storeModalController',storeModalController)

