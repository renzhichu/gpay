import addComponent from './component';
export default angular.module('appAdd', [])
  .config(($stateProvider) => {
    "ngInject";
    $stateProvider.state('appadd', {
      url: '/app/add',
      template: '<appadd></appadd>'
    });
  })
  .component('appadd', addComponent);