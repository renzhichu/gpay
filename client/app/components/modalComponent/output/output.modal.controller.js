export default class outputModalController{
    constructor(stockStatus){
        'ngInject';
        console.log('stockStatus',stockStatus);
        this.stockStatus = stockStatus;  //参数再次透传一次
    }
}