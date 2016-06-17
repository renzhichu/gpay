/**
 * @desc 定义controller
 * 通过类的方式声明一个controller,scope是独立的
*/
class Controller {
  /**
   * @desc 构造函数
   * 在参数里声明，依赖会被自动注入
   * @return null { Null }
  */
  constructor($scope, $location, $attrs, $transclude) {
  	'ngInject';

    var vm = this;

    vm.name = 'errorMsg';
    vm.formKey = $attrs['formKey'] || "";
    let child = $transclude();
    vm.msg = child.length ? child[0].innerHTML : "输入有误，请重新输入";
  }

}

export default Controller;
