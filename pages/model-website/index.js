/************岗位首页页面****************/
var P = require('../../lib/wxpage')
P('index', {
  data: {
    navId: '1',
  },

  onLaunch: function () {
  },

  /**
   * 初次加载页面配置
   * **/
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '快报名'
    })
    wx.showShareMenu({
      withShareTicket: true
    })
    this.setData({
      city: options.city
    })
    console.log("options.city$$$$$$$$$" + options.city)
  },

  /**
     * 下拉刷新
     * **/
  onPullDownRefresh: function () {
    //this.getPayCourseList();
    wx.stopPullDownRefresh()
  },

  /**
   * 模版列表页面头部点击事件
   * 1：全部
   * 2：微官网
   * 3：微班级
   */

  clickNavItem: function (e) {
    this.setData({
      navId: e.currentTarget.dataset.id
    });
  }
})
