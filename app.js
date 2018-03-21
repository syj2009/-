var d = new Date()
require('./lib/wxpage').A({
  data: {
    host: 'https://devkbmapi.huikao8.cn',
    isFirstGo: true,
  },
  config: {
    route: '/pages/$page',
  },
  onLaunch: function (opts) {
    var that = this;
    //配置用户设置
    that.getSettingStatues();
    //获取用户openid
    that.login();
    wx.showShareMenu({
      withShareTicket: true
    })
    
  },
  onShow: function () {
    // Do something
  },
  getSettingStatues:function(){
    var that = this;
    wx.getSetting({
      success:function(res){
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+JSON.stringify(res))
        if(!res.authSetting['scope.userInfo']){
          wx.authorize({
            scope: 'scope.userInfo',
            success(data){
              that.setData({
                isFirstGo:false
              })
            },
            fail(){
              wx.openSetting({
              })
            },
          })
        }
      }
    });
  },
  login:function(){
    var that = this;
    wx.login({
      success: function (res) {
        wx.request({
          url: that.data.host + '/api/Account/GetOpenIDByCode',
          data: {
            'Code': res.code,
          },
          method: 'POST',
          dataType: 'json',
          success: function (res) {
            if (res.data.Msg) {
              wx.setStorageSync("Openid",res.data.Info.Openid);
              if (that.data.isFirstGo){
                wx.request({
                  url: that.data.host + '/api/Account/SaveUserInfo',
                  data: {
                    "Openid": res.data.Info.Openid,
                    "HeaderImge": "", 
                    "Name": "", 
                    "Phone":"",
                    "QrCode": "", 
                    "TrainingName": "", 
                    "TrainingAdd": "", 
                  },
                  method: 'POST',
                  dataType: 'json',
                  success: function (res) {
                    wx.setStorageSync("userId", res.data.Info.Id);
                  },
                });
              }else{
                wx.getUserInfo({
                  success: function (res) {
                    var userInfo = res.userInfo;
                    wx.setStorageSync("userInfo", res.userInfo);
                    wx.request({
                      url: that.data.host + '/api/Account/SaveUserInfo',
                      data: {
                        "Openid": res.data.Info.Openid,
                        "HeaderImge": userInfo.avatarUrl,
                        "Name": userInfo.nickName,
                        "Phone": "",
                        "QrCode": "",
                        "TrainingName": "",
                        "TrainingAdd": "",
                      },
                      method: 'POST',
                      dataType: 'json',
                      success: function (res) {
                        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>2" + JSON.stringify(res));
                      },
                    });
                    
                  }
                })
              }
            }
          }
        })
      }
    })
  }
})
