/************我的-个人信息页面****************/
var P = require('../../lib/wxpage')
P('index', {
  
  data: {

  },

  onLaunch: function () {
  },

  /**
   * 初次加载页面配置
   * **/
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '个人信息'
    })
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  /**
   * 下拉刷新
   * **/
  onPullDownRefresh: function () {
    //this.getPayCourseList();
    wx.stopPullDownRefresh()
  },

  /**
   * 更换图片（未完成）
   * **/
  changeImage:function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          headImage: tempFilePaths,
        })
      },
    });
  },

  /**
   * 提交（未完成）
   * **/
  formSubmit: function () {
    var that = this;
    // var formData = e.detail.value;
    // if (formData.name == '') {
    //   feedbackApi.showToast({ title: '姓名不能为空' })//调用  
    //   return false;
    // };
    wx.showLoading({
      title: '加载中',
    });
    console.log("提交表单按钮");
  }
})
