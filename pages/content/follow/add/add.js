var P = require('../../lib/wxpage.js')
P('index', {
  /**
     * 初次加载页面配置
     * **/
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '新增跟进'
    })
  },
  /**
   * 更多按钮点击事件
   */
  customerSource: function () {
    wx.showActionSheet({
      itemList: ['社会散招', '行业招生', '老生推荐', '广告宣传', '快报名', '其他'],
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
        }
      }
    });
  },
  followUpMethod: function () {
    wx.showActionSheet({
      itemList: ['电话', '微信', '拜访', '邮件', '短信', '其他'],
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
        }
      }
    });
  },
  followUpState: function () {
    wx.showActionSheet({
      itemList: ['未处理', '联系方式无效', '初访', '意向', '报名', '拒绝报名'],
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
        }
      }
    });
  }
})  