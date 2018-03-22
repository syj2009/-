/************我的-我的名片页面****************/
var P = require('../../lib/wxpage')
P('index', {
  
  // 分享名片
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '快报名',
      path: '/pages/business-card/index',
        // 转发成功
      success: function (res) {
        console.log("转发成功！");
      },
        // 转发失败
      fail: function (res) {
        console.log("转发失败！");
      }
    }
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
      title: '我的名片'
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

})
