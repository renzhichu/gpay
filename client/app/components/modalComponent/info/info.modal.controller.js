export default class infoModalController{
    constructor(addRecordStatus){
        'ngInject';
        console.log('addRecordStatus',addRecordStatus);
        this.addRecordStatus = addRecordStatus;  //参数再次透传一次
    }
}