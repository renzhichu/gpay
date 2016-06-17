import template from './info.html';
import controller from './info.controller';
import './info.less';

let infoComponent = {
  restrict: 'E',
  bindings: {
  	addRecordStatus:'<'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default infoComponent;
