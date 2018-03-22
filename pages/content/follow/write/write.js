var P = require('../../lib/wxpage.js')
P('index', {
  /**
     * 初次加载页面配置
     * **/
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '写跟进'
    })
  },
  /**
   * 更多按钮点击事件
   */
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