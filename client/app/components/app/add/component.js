import template from './index.html';
import controller from './controller';
import './index.less';

let addComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default addComponent;
