class RejectController {
  constructor(rejectModalInstance,stockSvc) {
    'ngInject';
    this.rejectModalInstance = rejectModalInstance;
    this.stockSvc = stockSvc;
  }

  /**
   * 关闭弹窗
   */
  close(){
    this.rejectModalInstance.instance.dismiss('close');
  }

  /**
   * 拒绝原因
   */
  rejectReason(){
    this.stockSvc
      .review({
        id:this.stockid,
        status:2,
        comment:this.comment
      })
      .then(data=>{
        this.rejectModalInstance.instance.close(data);
      })
  }
}

export default RejectController;
