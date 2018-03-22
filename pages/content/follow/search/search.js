var P = require('../../lib/wxpage')
P('index', {

  data: {
    selectName:"",
    searchInput: "", //搜索内容
    dataArray: [] //显示的数据源
  },

  /**
     * 初次加载页面配置
     * **/
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '跟进'
    }),
    this.getData();
  },

  //获取数据
  getData: function () {
    var self = this;
      wx.request({
        url: getApp().data.host + "/api/FollowUp/GetFollowUpState",
        data: {
          
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          if (res.data.Msg) {
            var tempData = res.data.Info;
            var selectName = res.data.selectName;
            for (var i = 0; i < tempData.StatuesList.length; i++){
              if (tempData.StatuesList[i].StateName == selectName) {
                //有默认选项
                tempData.StatuesList[i].isSelect = true
              } else {
                tempData.StatuesList[i].isSelect = false
              }
            }
            self.setData({
              dataArray: tempData.StatuesList
            })
            console.log("line 29....", tempData)
            
          }
        },
      });
  },

  //跟进状态点击事件
  itemclick: function(e) {
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

//
  searchInput: function (e) {
    // 
    this.setData({
      searchInput: e.detail.value
    })
  },

  //提交事件
  submitClick: function (e) {

    //状态id
    var self = this;
    var submitId = "";
    for (var i = 0; i < self.data.dataArray.length; i++) {
      if (self.data.dataArray[i].isSelect == true) {
        submitId = self.data.dataArray[i].id;
        break;
      }
    }
    //获取输入内容
    var submitStr = self.data.searchInput;

    //返回页面改值
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    console.log("====", submitStr, submitId)
    // 直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      query: submitStr,
      state: submitId
    })
    wx.navigateBack();
  },

  //重置事件
  clearClick: function(e) {
    var self = this;
    for (var i = 0; i < self.data.dataArray.length; i++) {
      self.data.dataArray[i].isSelect = false;
    }
  
    //更新数据
    self.setData(
      {
        dataArray: self.data.dataArray,
        searchInput: ''
      });
  }



})  