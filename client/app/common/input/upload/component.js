/**
 * @desc 每个模块都是一个组件，声明模块的模板、控制器等参数
*/
import template from './index.html';
import controller from './controller';

let component = {
  restrict: 'E',
  bindings: {
    "formPics": "=",
    "formBase": "="
  },
  transclude: true,
  template,
  controller,
  controllerAs: 'vm'
};

export default component;
