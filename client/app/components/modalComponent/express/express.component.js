import template from './express.html';
import controller from './express.controller';
import './express.less';

let expressComponent = {
  restrict: 'E',
  bindings: {
  	addExpressStatus:'<'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default expressComponent;
