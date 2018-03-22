var P = require('../../lib/wxpage')
P('index', {

  data: {
    pageNum: 1,
    query: "",
    state: "",
    hasNextPage: true,
    dataArray: [] //显示的数据源
  },

  onShow: function () {
    this.getData();
  },
  
  /**
     * 初次加载页面配置
     * **/
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '跟进'
    })
  },
  

  //上拉加载更多
  loadMore: function () {
    var self = this;
    // 当前页是最后一页
    if (self.data.hasNextPage == false) {
      return;
    }
    setTimeout(function () {
      console.log('上拉加载更多');
      var tempPageNum = self.data.pageNum;
      tempPageNum = tempPageNum + 1;
      self.setData({
        pageNum: tempPageNum,
      })
      self.getData();
    }, 300);

  },

  //获取数据
  getData: function () {
    var pageNum = this.data.pageNum;
    var query = this.data.query;
    var state = this.data.state;
    var self = this;
    if (self.data.hasNextPage) {
      wx.request({
        url: getApp().data.host + "/api/FollowUp/GetFollowUpList",
        data: {
          "UserId": '1', //UserId
          "PageNum": pageNum,
          "PageSize": "10",
          "Query": query,
          "State": state //跟进状态
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          if (res.data.Msg) {
            var tempData = res.data.Info
            if (pageNum == 1) {
              //第一页数据
              self.setData({
                hasNextPage: tempData.HasNextPage,
                dataArray: tempData.FollowList
              })
            } else {
              //加载更多
              var tempArray = self.data.dataArray;
              tempArray = tempArray.concat(tempData.FollowList);
              self.setData({
                hasNextPage: tempData.HasNextPage,
                dataArray: tempArray
              })
            }
          }
        },
      });
    }
  },


  //跳转到筛选页面
  inputclick: function () {
    wx.navigateTo({
      url: '/pages/content/follow/search/search',
    })
  },

  //跳转到跟进详情页面
  detailclick: function (e) {
    var index = e.currentTarget.id;
    var tempFollowId = this.data.dataArray[index].FollowId;
    wx.navigateTo({
      url: '/pages/content/follow/details/details' + "?followId=" + tempFollowId,
    })
  },

  //跳转到写跟进页面
  addclick: function () {
    wx.navigateTo({
      url: '../../pages/content/follow/add/add',
    })
  },


})  