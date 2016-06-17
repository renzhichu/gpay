import template from './index.html';
import controller from './controller';
import './index.less';

let listComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default listComponent;
