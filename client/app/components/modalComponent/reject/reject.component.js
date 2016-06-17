import template from './reject.html';
import controller from './reject.controller';
import './reject.less';

let rejectComponent = {
  restrict: 'E',
  bindings: {
    stockid:'<'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default rejectComponent;
