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

  //制作我的招生方案
  makeClick: function () {
    wx.showToast({
      title: '制作我的招生方案',
    })
  },

  //选择举报原因
  itemclick: function (e) {
    var self = this;
    var index = e.currentTarget.id;
    var tempBool = self.data.dataArray[index].isSelect
    self.data.dataArray[index].isSelect = !tempBool;
    self.setData(
      {
        dataArray: self.data.dataArray
      });
  },

  //提交举报原因
  submitclick:function () {
    var submitStr = "";
    for (var i = 0; i < this.data.dataArray.length; i++){
      if (this.data.dataArray[i].isSelect == true) {
        if (i == this.data.dataArray.length - 1) {
          submitStr += this.data.dataArray[i].id
        } else {
          submitStr += this.data.dataArray[i].id + ","
        }
      }
    }
    console.log("举报原因id ....", submitStr)
    if (submitStr == ""){
      wx.showToast({
        title: '请选择举报原因',
      })
    }else {
      this.setData({
        showModal:false
      });
    }
  }
})
