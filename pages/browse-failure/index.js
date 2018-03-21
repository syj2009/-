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
      title: '微班级'
    })
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  //制作我的招生方案
  makeClick: function () {
    wx.showToast({
      title: '制作我的招生方案',
    })
  }

  

})
