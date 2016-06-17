import template from './relevance.html';
import controller from './relevance.controller';
import './relevance.less';

let relevanceComponent = {
  restrict: 'E',
  bindings: {
    relevanceid:'<'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default relevanceComponent;
