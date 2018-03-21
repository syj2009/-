/************微班级编辑页面****************/
var P = require('../../lib/wxpage')
P('index', {
  data: {
    //封面是否显示
    coverShow: false,
    //弹框状态
    alertShow: false,
    chartStatues: {
      maxChartLength: 120,
      currentChartLength: 0
    },
    currentInputValue: '',//表示当前所在的input框的位置
    //图片相关数据
    headImg: "../../image/modelDetail/wenzi.png",
    //描述的相关数据
    classDesc: "",
    classContent: "",
    peopleDesc: "",
    peopleContent: "",
    classTimeDesc: "",
    classTimeContent: "",
    //机构列表的数据
    classTitle: "",
    institutionAdvList: [{
      institutionAdvImg: "../../image/modelDetail/banner001.png",
      institutionAdvItemDesc: "",
    }],
    //培训项目列表
    projectTitle:"",
    projectList:[{
      projectItemImg:"../../image/modelDetail/banner001.png",
      projectItemName:""
    }]
  },

  onLaunch: function () {
  },

  /**
   * 初次加载页面配置
   * **/
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '快报名'
    })
    wx.showShareMenu({
      withShareTicket: true
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
   * 监听textarea字数
   */
  chartNumberChange: function (e) {
    console.log(e.detail.value);
    // 获取输入框的内容  
    var value = e.detail.value;
    // 获取输入框内容的长度  
    var len = parseInt(value.length);
    // this.setData({
    //   currentChartLength: e.detail.value
    // });
    //最多字数限制  
    if (len > this.data.chartStatues.maxChartLength) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行  
    this.setData({
      chartStatues: {
        currentChartLength: len, //当前字数 
        maxChartLength: this.data.chartStatues.maxChartLength
      }
    });
  },

  /**
   * 取消按钮
   */

  cancleClick: function (e) {

    if (e.currentTarget.dataset.id == '1') {
      this.setData({
        alertShow: false,
      })
    } else {
      this.setData({
        coverShow: false,
      })
    }
  },

  /**
   * 确定按钮
   */
  submitClick: function (e) {
    if (e.currentTarget.dataset.id == 1) {
      this.setData({
        alertShow: false,
      })
    } else {
      this.setData({
        coverShow: false,
      })
    }

  },

  /**
   * 展示输入弹框
   */
  changeText: function (e) {
    this.setData({
      alertShow: true,
      currentInputValue: e.currentTarget.dataset.id
    })
  },

  /**
   * 展示保存弹框
   */

  saveClick: function () {
    this.setData({
      coverShow: true,
    });
  },

  /**
   * 修改图片的方法
   */
  changeImage: function () {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(">>>>>>>>>>>>" + tempFilePaths);
        that.setData({
          imgHead: tempFilePaths
        });
      }
    })
  }
})
