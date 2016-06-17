import template from './output.html';
import controller from './output.controller';
import './output.less';

let outputComponent = {
  restrict: 'E',
  bindings: {
    stockStatus:'<'  //在页面中 驼峰改为中划线
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default outputComponent;
