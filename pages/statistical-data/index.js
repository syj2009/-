/************招生-统计数据页面****************/
var P = require('../../lib/wxpage')
P('index', {
  toVisitNumber: function (e) {
    var that = this
    wx.navigateTo({
      url: "/pages/visitor/index"
    });
  },
  data: {
  },

  onLaunch: function () {
  },

  /**
   * 初次加载页面配置
   * **/
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '统计数据'
    })
    wx.showShareMenu({
      withShareTicket: true
    })
    this.getsignUplList();
  },
  /**
   * 获取报名学员列表
   * **/
  getsignUplList: function () {
    
  },

  /**
     * 下拉刷新
     * **/
  onPullDownRefresh: function () {
    //this.getPayCourseList();
    wx.stopPullDownRefresh()
  },

})
