import relevanceComponent from './relevance.component';
import relevanceModalController from './relevance.modal.controller';
export default angular.module('modalComponentRelevance',[])
  .component('modalComponentRelevance', relevanceComponent)
  .constant('relevanceModalInstance', {instance:null})
  .controller('relevanceModalController',relevanceModalController)

