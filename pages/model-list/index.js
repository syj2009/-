/************岗位首页页面****************/
var P = require('../../lib/wxpage')
P('index', {
  data: {
    errorImg: "../../image/browse_failure/browse_failure.png",
    navId:'1',
    dataArray: []
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
    this.getModelList();
  },

  /**
     * 下拉刷新
     * **/
  onPullDownRefresh: function () {
    //this.getPayCourseList();
    this.getModelList();
    setTimeout(function(){
      wx.stopPullDownRefresh()
    },2000)
  },

  /**
   * 模版列表页面头部点击事件
   * 0：全部
   * 1：微官网
   * 2：微班级
   */

  clickNavItem:function(e){
    this.setData({
      navId: e.currentTarget.dataset.id
    });
    this.getModelList();
  },
  /**
   * 获取模板列表
   */
  getModelList:function(){
    var that = this;
    var userId = wx.getStorageSync("userId");
    wx.request({
      url: getApp().data.host + "/api/Template/GetTemplateList",
      data: {
        "UserId": userId,
        "TypeId": that.data.navId, 
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>模版列表" + JSON.stringify(res))
        if(res.data.Msg){
          that.setData({
            dataArray: res.data.Info.TemplateList
          });
        }
      },
    });
  },

  //错误图片处理
  errorFunction:function(e){
    if (e.type == "error") {
      var errorImgIndex = e.target.dataset.id; //获取错误图片下标
      var imgList = this.data.dataArray 　　　　　　　//将图片列表数据绑定到变量
      imgList[errorImgIndex].Url = this.data.errorImg //错误图片替换为默认图片
      this.setData({
        dataArray: imgList
      })
    }
  },
  //新建模板
  goModelDetail:function(e){
    if (e.currentTarget.dataset.typeid=='1'){
      wx.navigateTo({
        url: '/pages/model-website-edite/index?type=1',
      });
    }else{
      wx.navigateTo({
        url: '/pages/model-class-edite/index?type=1',
      });
    }
  },
})
