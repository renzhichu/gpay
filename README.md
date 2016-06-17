* [项目介绍](#walkthrough)
    * [项目构建](#build-system)
    * [项目结构](#file-structure)
* [开始开发](#getting-started)
    * [项目依赖](#dependencies)
    * [项目运行](#running-the-app)
        * [Gulp Tasks](#gulp-tasks)
        * [Testing](#testing)
    * [静态代码检查](#lint-the-app)
    * [单元测试](#testing-setup)
    * [生成模版](#generating-components)    

# Walkthrough
## Build System
项目基于webpack gulp构建工作
全局安装 `sudo npm i -g gulp webpack eslint babel less karma karma-cli`

`Webpack` 处理文件依赖:
* 采用 `Babel` 编译js代码 ES6 to ES5 
* 用模块加载的方式加载html
* 编译less
* 动态编译刷新
* 改动模块热启动

`Gulp` 处理打包流程:
* 启动webpack流程
* 生成app模块模版

## File Structure
每一个页面或组件都是一个模块
```
client
⋅⋅app/
⋅⋅⋅⋅app.js * 项目入口
⋅⋅⋅⋅app.html * 项目html
⋅⋅⋅⋅common/ * 公共的组件
⋅⋅⋅⋅⋅⋅header/ * 头模块
⋅⋅⋅⋅⋅⋅⋅⋅index.js * 模块入口 (routes, configurations, and declarations occur here)
⋅⋅⋅⋅⋅⋅⋅⋅component.js * 模块结构部分 
⋅⋅⋅⋅⋅⋅⋅⋅controller.js * controller
⋅⋅⋅⋅⋅⋅⋅⋅index.less * styles
⋅⋅⋅⋅⋅⋅⋅⋅index.html * template
⋅⋅⋅⋅⋅⋅⋅⋅index.spec.js * specs (for entry, component, and controller)
⋅⋅⋅⋅components/ * 不同页面模块
⋅⋅⋅⋅⋅⋅components.js * 页面模块入口
⋅⋅⋅⋅⋅⋅demo/ * 示例模块
⋅⋅⋅⋅⋅⋅⋅⋅index.js * 模块入口 (routes, configurations, and declarations occur here)
⋅⋅⋅⋅⋅⋅⋅⋅component.js * 模块结构部分 
⋅⋅⋅⋅⋅⋅⋅⋅controller.js * controller
⋅⋅⋅⋅⋅⋅⋅⋅index.less * styles
⋅⋅⋅⋅⋅⋅⋅⋅index.html * template
⋅⋅⋅⋅⋅⋅⋅⋅index.spec.js * 首页 specs (for entry, component, and controller)
```

## Testing Setup
* Karma
* Webpack + Babel
* Mocha
* Chai

启动测试, 执行 `npm test` or `karma start` 

# Getting Started
## Dependencies
执行项目之前,电脑需要配置以下环境:
* `node` and `npm`
第一次执行时确认本机有以下安装包:  
`npm install -g gulp karma karma-cli webpack`
`npm install` 安装所有依赖

## Running the App
执行 `gulp` 启动调试
 
### Gulp Tasks
* `webpack`
  * 执行 `gulp webpack` 打包上线
* `default` (which is the default task that runs when typing `gulp` without providing an argument)
  * 执行 `gulp` 启动本地调试.
* `component`
  * 执行 `gulp component` 生成一个项目模块模版. [Read below](#generating-components) 获取更多信息.
  
### Testing
执行 `npm test`.

### Generating Components
一个模块的模版如下
```
⋅⋅⋅⋅⋅⋅componentName/
⋅⋅⋅⋅⋅⋅⋅⋅images // 图片文件夹
⋅⋅⋅⋅⋅⋅⋅⋅index.js // 模版入口 声明该模块的依赖
⋅⋅⋅⋅⋅⋅⋅⋅index.spec.js // 模块单测的测试用例
⋅⋅⋅⋅⋅⋅⋅⋅component.js // 模块的模板 controller model声明
⋅⋅⋅⋅⋅⋅⋅⋅controller.js // 控制器 与页面相关的写在这里
⋅⋅⋅⋅⋅⋅⋅⋅controller.spec.js // 控制器的测试用例
⋅⋅⋅⋅⋅⋅⋅⋅index.html // 模块模板
⋅⋅⋅⋅⋅⋅⋅⋅index.less // styles
```

增加模块, 执行 `gulp component --name 要建立模块的名字`.

模块默认会生成在 `client/app/components` 目录下. 可以通过修改 `--parent` 参数来改变生成的目录, 基准目录是 `client/app/components/`.

比如, 执行 `gulp component --name signup --parent auth` 将会在创建在 `client/app/components/auth/signup` 下.  

生成一个公共模块 执行 `gulp component --name commonheader --parent ../common` 就创建了BP后台的公共头部 `client/app/common/footer`.  


有其他任何问题联系 `刘炳礼 liubingli@new4g.cn`