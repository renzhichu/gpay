import template from './gift.html';
import controller from './gift.controller';
import './gift.less';

let giftComponent = {
  restrict: 'E',
  bindings: {
    stockStatus:'<'  //在页面中 驼峰改为中划线
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default giftComponent;
