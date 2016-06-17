import header from './header'; 
import footer from './footer';
import inputUpload from './input/upload/index';
import errorMsg from './input/error/index';

let commonModule = angular.module('app.common', [
  header.name,
  footer.name,
  inputUpload.name,
  errorMsg.name
]);
export default commonModule;
