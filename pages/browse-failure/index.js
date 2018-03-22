/************岗位首页页面****************/
var P = require('../../lib/wxpage')
P('index', {
  data: {
    showModal: true,
    dataArray: [
      {
        isSelect: false,
        id: 121,
        name: "恶意营销、虚假宣传"
      },
      {
        isSelect: false,
        id: 2,
        name: "谣言、社会负面、诈骗"
      },
      {
        isSelect: false,
        id: 3,
        name: "色情、赌博、毒品"
      },
      {
        isSelect: false,
        id: 4,
        name: "抄袭、侵权"
      },
      {
        isSelect: false,
        id: 511,
        name: "违反国家法律政策、法律、法规"
      }
    ]
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

  //制作我的招生方案 跳转到index首页
  makeClick: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  //选择举报原因
  itemclick: function (e) {
    var self = this;
    var index = e.currentTarget.id;
    var tempBool = self.data.dataArray[index].isSelect
    for (var i = 0; i < this.data.dataArray.length; i++) {
      if (index == i) {
        self.data.dataArray[i].isSelect = !tempBool;
      } else {
        self.data.dataArray[i].isSelect = false;
      }
    }
    //更新数据
    self.setData(
      {
        dataArray: self.data.dataArray
      });
  },

  //提交举报原因
  submitclick: function () {
    var submitId = "";
    for (var i = 0; i < this.data.dataArray.length; i++) {
      if (this.data.dataArray[i].isSelect == true) {
        submitId = this.data.dataArray[i].id;
        break;
      }
    }
    //console.log("举报原因id ....", submitId)
    if (submitId == "") {
      wx.showToast({
        title: '请选择举报原因',
      })
    } else {
      wx.showToast({
        title: '举报成功',
      })
      this.setData({
        showModal: false
      });
    }

  }
})
