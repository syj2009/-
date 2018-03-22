/************岗位首页页面****************/
var P = require('../../lib/wxpage')
P('index', {
  data: {
    errorImg:"../../image/browse_failure/browse_failure.png",
    //1：轮播图相关配置
    imgUrls: [],
    isShow:false,
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    //2.列表相关信息
    myProgrammeList:[],
    hasNextPage:true,
    pageNum:'1',
  },

  onLaunch: function () {
  },

  /**
   * 初次加载页面配置
   * **/
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '快报名'
    });
    wx.showShareMenu({
      withShareTicket: true
    });
    //获取列表数据
    this.getModelList();
    var userInfo = wx.getStorageSync("userInfo");
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>获取个人信息"+JSON.stringify(userInfo));
  },

  getModelList: function () {
    var that = this;
    var openId = wx.getStorageSync("Openid");
    wx.request({
      url: getApp().data.host + "/api/Template/GetMyProgrammeList",
      data: {
        "OpenId": openId,
        "PageNum": "1",
        "PageSize": "10",
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        console.log(JSON.stringify(res))
        if(res.data.Msg){
          if (res.data.Info.BannerList.length>0){
            that.setData({
              imgUrls: res.data.Info.BannerList,
              isShow: true
            });
          }else{
            that.setData({
              imgUrls: res.data.Info.BannerList,
              isShow: false
            });
          }

          if (res.data.Info.BannerList.length>0){
            that.setData({
              myProgrammeList: res.data.Info.MyProgrammeList,
              hasNextPage: res.data.Info.HasNextPage,
              pageNum:"2"
            });
          }else{
            that.setData({
              myProgrammeList: res.data.Info.MyProgrammeList,
              hasNextPage: false,
              pageNum: "1"
            });
          }
        }
        console.log(">>>>>>>>>>>>>>>>>>>>2" + JSON.stringify(res))
      },
    });
  },

  //下拉刷新
  onPullDownRefresh: function () {
    //获取列表数据
    this.getModelList();
    setTimeout(function(){
      wx.stopPullDownRefresh();
    },2000);
  },

  //上拉加载更多
  loadMore:function(){
    console.log("上啦加载啦");
    var openId = wx.getStorageSync("Openid");
    var pageNum = this.data.pageNum;
    var that = this;
    if (this.data.hasNextPage) {
      wx.request({
        url: getApp().data.host + "/api/Template/GetMyProgrammeList",
        data: {
          "OpenId": openId,
          "PageNum": pageNum,
          "PageSize": "10",
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          if (res.data.Msg) {
            if (res.data.Info.BannerList.length > 0) {
              pageNum = pageNum + 1;
              var myArr = that.data.myProgrammeList.concat(res.data.Info.MyProgrammeList)
              that.setData({
                myProgrammeList: myArr,
                hasNextPage: res.data.Info.HasNextPage,
                pageNum: pageNum
              });
            }
          }
        },
      });
    }
  },

  /**
   * 跳转到模版列表页面
   */
  goModelList: function () {
    wx.navigateTo({
      url: "/pages/model-list/index",
    })
  },
  /**
   * 更多按钮点击事件
   */
  openAcctionSheet:function(e){
    console.log(JSON.stringify(e.currentTarget.dataset.id))
    wx.showActionSheet({
      itemList: ['统计', '编辑', '停用','删除'],
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
        }
      }
    });
  },
  /**
   * 按钮分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  //错误图片处理
  errorFunction: function (e) {
    if (e.type == "error") {
      var errorImgIndex = e.target.dataset.id; //获取错误图片下标
      console.log(errorImgIndex);
      var imgList = this.data.myProgrammeList 　　　　　　　//将图片列表数据绑定到变量
      imgList[errorImgIndex].ProgrammeImg = this.data.errorImg //错误图片替换为默认图片
      this.setData({
        myProgrammeList: imgList
      })
      console.log(this.data.imgUrls)
    }
  },
  //错误图片处理
  errorBannerFunction:function(e){
    if (e.type == "error") {
      var errorImgIndex = e.target.dataset.id; //获取错误图片下标
      var imgList = this.data.imgUrls 　　　　　　　//将图片列表数据绑定到变量
      imgList[errorImgIndex].ImgUrl = this.data.errorImg //错误图片替换为默认图片
      this.setData({
        imgUrls: imgList
      })
    }
  }
})
