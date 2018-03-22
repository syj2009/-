var P = require('../../lib/wxpage.js')
P('index', {
  /**
     * 初次加载页面配置
     * **/
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '跟进详情'
    })
  },
  /**
   * 更多按钮点击事件
   */
  examinationIndustry: function () {
    wx.showActionSheet({
      itemList: ['会计教育', '高考教育', '音乐教育', '其他'],
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
        }
      }
    });
  },
  examinationClassify: function () {
    wx.showActionSheet({
      itemList: ['会计资格证', '教师资格证', '幼教资格证', '律师资格证', '其他'],
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
        }
      }
    });
  },
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
  data: {
    selected: true,
    selected1: false
  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  }
})
