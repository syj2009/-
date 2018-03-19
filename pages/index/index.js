/************岗位首页页面****************/
var P = require('../../lib/wxpage')
P('index', {
  data: {
    //1：轮播图相关配置
    imgUrls: [
      '../../image/index/banner.png',
      '../../image/index/banner.png',
      '../../image/index/banner.png'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
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
   * 跳转到模版列表页面
   */
  goModelList: function () {
    wx.navigateTo({
      url: "/pages/model-list/index",
    })
  }
})
