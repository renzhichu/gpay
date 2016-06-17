/**
 * @desc 每个模块都是一个组件，声明模块的模板、控制器等参数
*/
import template from './index.html';
import controller from './controller';
import './index.less';

let component = {
  restrict: 'E',
  bindings: {
    "formBase": "="
  },
  transclude: true,
  template,
  controller,
  controllerAs: 'vm'
};

export default component;
