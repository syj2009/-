var d = new Date()
require('./lib/wxpage').A({
  data: {
    host: 'https://testapi.nbig.com.cn',
  },
  config: {
    route: '/pages/$page',
  },
  onLaunch: function (opts) {
    var that = this;
    wx.showShareMenu({
      withShareTicket: true
    })
    // wx.login({
    //   success: function (res) {
    //     var wxUserInfo = wx.getStorageSync('wxUserInfo')
    //     wx.request({
    //       url: that.data.host + '/api/Account/GetUserInfo',
    //       data: {
    //         'WeChatAccount': res.code,
    //         'HeadImg': "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83er2O1yrwic2ntc5qy3qLpJic1ASYnzRFAicMbw1l10ic3d9hBDlXet34klvg4niaoFO1fYG8Ck0IvtHZvQ/0",
    //         'UserName': "关关雎鸠",
    //       },
    //       method: 'POST',
    //       dataType: 'json',
    //       success: function (res) {
    //         if (res.data.Msg) {
    //           console.log("wxOpenId:" + res.data.Info.OpenId)
    //           wx.setStorageSync('wxUserId', res.data.Info.UserId);
    //           wx.setStorageSync('wxOpenId', res.data.Info.OpenId);
    //           wx.setStorageSync('StudyNumber', res.data.Info.StudyNumber);
    //         }
    //       }
    //     })
    //   }
    // })
  },
  onShow: function () {
    // Do something
  },
})
