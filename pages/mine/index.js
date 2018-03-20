/************岗位首页页面****************/
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
      title: '我的'
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
   * 跳转到模版列表页面
   */
  // goModelList: function () {
  //   wx.navigateTo({
  //     url: "/pages/model-list/index",
  //   })
  // }
})
