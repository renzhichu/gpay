import template from './store.html';
import controller from './store.controller';
import './store.less';

let storeComponent = {
  restrict: 'E',
  bindings: {
    storeinfo:'<',
    
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default storeComponent;
