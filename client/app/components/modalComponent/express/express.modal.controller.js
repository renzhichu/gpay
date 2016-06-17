export default class expressModalController{
    constructor(addExpressStatus){
        'ngInject';
        console.log('addExpress',addExpressStatus);
        this.addExpressStatus = addExpressStatus;  //参数再次透传一次
    }
}