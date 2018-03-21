var P = require('../../../../lib/wxpage')
P('index', {
  /**
     * 初次加载页面配置
     * **/
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '跟进'
    })
  }
})  