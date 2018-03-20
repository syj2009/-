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
  },
  /**
   * 更多按钮点击事件
   */
  openAcctionSheet:function(){
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
        }
      }
    });
  },
  /**
   * 按钮分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
