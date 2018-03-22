/************我的-个人信息页面****************/ 
var P = require('../../lib/wxpage')
P('index', {
  
  data: {
    Name: '',
    HeaderImge: '',
    Phone:'',
    TrainingName:'',
    TrainingAdd: '',
    QrCode: '',
  },

  onLaunch: function () {
  },

  /**
   * 初次加载页面配置
   * **/
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '个人信息'
    })
    wx.showShareMenu({
      withShareTicket: true
    })

    // 从本地缓存中获取用户名称和头像
    var that = this;
    var userInfo = wx.getStorageSync("userInfo");
    that.setData({
      HeaderImge: userInfo.avatarUrl,
      Name: userInfo.nickName,
    })
  },


  /**
   * 下拉刷新
   * **/
  onPullDownRefresh: function () {
    //this.getPayCourseList();
    wx.stopPullDownRefresh()
  },

  /**
   * 更换图片
   * **/
  changeImage:function(e){
    var that = this;
    var positionIndex = e.currentTarget.dataset.id;
    console.log("positionIndex---", e.currentTarget.dataset.id);
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: getApp().data.host + "/api/Account/UploadImage",
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            var data = JSON.parse(res.data);
            if (data.Msg) {
              //单个点击事件
              switch (positionIndex) {
                case "1"://头像
                  that.setData({
                    HeaderImge: data.Info.Url
                  });
                  break;
                case "2"://二维码
                  that.setData({
                    QrCode: data.Info.Url
                  });
                  break;
                  default:
                  break;
              }
            } 
          }
        })
      },
    });
  },

  /**
   * 提交(修改个人信息)（未完成）
   * **/
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    // console.log("data------",that.data);
    if (that.data.Name === '') {
      feedbackApi.showToast({ title: '姓名不能为空' })//调用  
      return false;
    }
    else{
      var openId = wx.getStorageSync("Openid");
      wx.request({
        method: 'POST',
        dataType: 'json',
        url: getApp().data.host + "/api/Account/SaveUserInfo",
        data: {
          "OpenId": openId,
          "HeaderImge": that.data.HeaderImge,
          "Name": that.data.Name,
          "Phone": that.data.Phone,
          "QrCode": that.data.QrCode,
          "TrainingName": that.data.TrainingName,
          "TrainingAdd": that.data.TrainingAdd,
        }, 
        header: {
          'Content-Type': 'application/json'
        }, 
        success: function (res) {
          console.log("res.data", res.data.Info);
          wx.setStorageSync('HeaderImge', that.data.HeaderImge);
          if (res.statusCode == 200) {
            console.log("提交成功");
          }
        },
      });
    }
    
    // wx.showLoading({
    //   title: '加载中',
    // });
  }
})
