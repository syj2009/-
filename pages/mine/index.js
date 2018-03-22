/************我的页面****************/
var P = require('../../lib/wxpage')
P('index', {
  // 进入个人信息页面
  toPersonalInformation: function (e) {
    var that = this
    wx.navigateTo({
      url: "/pages/personal-information/index"
    });
  },
  //进入我的名片页面
  toBusinessCard: function (e) {
    var that = this
    wx.navigateTo({
      url: "/pages/business-card/index"
    });
  },
  data: {
    Name:'',
    HeaderImge:'',
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
    
    // 从本地缓存中获取用户名称和头像
    var that = this;
    var userInfo = wx.getStorageSync("userInfo");
    console.log("userInfo-----", userInfo);
    that.setData({
      HeaderImge: userInfo.avatarUrl,
      Name: userInfo.nickName
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
