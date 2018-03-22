/************微班级编辑页面****************/
var P = require('../../lib/wxpage')
P('index', {
  data: {
    currentInputValue: '',//表示当前所在的input框的位置
    //判断点击的输入类型
    textareaType: '0',
    //输入框内的值
    textareaValue: '',
    //弹框状态
    alertShow: false,
    chartStatues:{
      maxChartLength: 120,
      currentChartLength: 0
    },
    //图片相关数据
    headImg:"../../image/modelDetail/wenzi.png",
    courseImg:"../../image/modelDetail/banner001.png",
    classImg:"../../image/modelDetail/banner002.png",
    peopleImg:"../../image/modelDetail/banner002.png",
    codeImg:"../../image/modelDetail/banner002.png",
    schoolImg:"../../image/modelDetail/banner002.png",
    //描述的相关数据
    classContentTitle:"班级介绍",
    classContent:"班级介绍",
    fitPeopleTitle:"班级介绍",
    fitPeopleContent:"班级介绍",
    classTimeTitle:"班级介绍",
    classTimeContent:"班级介绍",
    codeDesc:"班级介绍",
    schoolName:"班级介绍",
    classTimeContentEnd: "班级介绍",
    classTimeContentBegin:"班级介绍",
    //班级列表的数据
    classTitle:"班级介绍",
    classList:[{
      CourseImageUrl:"../../image/modelDetail/banner002.png",
      CourseCounten:"",
      CourseName:"",
    }],
    //封面是否显示
    coverShow: false,
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
    var that = this;
    // 获取输入框的内容  
    var value = e.detail.value;
    // 获取输入框内容的长度  
    var len = parseInt(value.length);
    //最多字数限制  
    if (len > this.data.chartStatues.maxChartLength) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行  
    this.setData({
      chartStatues: {
        currentChartLength: len, //当前字数 
        maxChartLength: this.data.chartStatues.maxChartLength,
      },
      textareaValue: value
    });
  },

  /**
   * 取消按钮
   */

  cancleClick:function (e) {
    if (e.currentTarget.dataset.id == '1') {
      this.setData({
        alertShow: false,
        textareaValue: ''
      })
    } else {
      this.setData({
        coverShow: false,
        textareaValue: ''
      })
    }
  },

  /**
   * 确定按钮
   */
  submitClick:function(e){
    if (e.currentTarget.dataset.id == 1) {
      var dataType = this.data.textareaType;
      var positionIndex = this.data.currentInputValue;
      var value = this.data.textareaValue;
      var that = this;
      var maxNum = that.data.chartStatues.maxChartLength;
      if (dataType == '0') {
        //赋值
        switch (positionIndex) {
          case "1"://班级介绍title
            that.setData({
              classContentTitle: value,
              alertShow: false,
              chartStatues: {
                maxChartLength: maxNum,
                currentChartLength: 0
              },
            });
            break;
          case "2"://班级介绍内容
            that.setData({
              classContent: value,
              alertShow: false,
              chartStatues: {
                maxChartLength: maxNum,
                currentChartLength: 0
              },
            });
            break;
          case "3"://适合人群title
            that.setData({
              fitPeopleTitle: value,
              alertShow: false,
              chartStatues: {
                maxChartLength: maxNum,
                currentChartLength: 0
              },
            });
            break;
          case "4"://适合人群内容
            that.setData({
              fitPeopleContent: value,
              alertShow: false,
              chartStatues: {
                maxChartLength: maxNum,
                currentChartLength: 0
              },
            });
            break;
          case "5"://开课时间title
            that.setData({
              classTimeTitle: value,
              alertShow: false,
              chartStatues: {
                maxChartLength: maxNum,
                currentChartLength: 0
              },
            });
            break;
          case "6"://开始时间
            that.setData({
              classTimeContentBegin: value,
              alertShow: false,
              chartStatues: {
                maxChartLength: maxNum,
                currentChartLength: 0
              },
            });
            break;
          case "7"://结束时间
            that.setData({
              classTimeContentEnd: value,
              alertShow: false,
              chartStatues: {
                maxChartLength: maxNum,
                currentChartLength: 0
              },
            });
            break;
          case "8"://学校名字
            that.setData({
              schoolName: value,
              alertShow: false,
              chartStatues: {
                maxChartLength: maxNum,
                currentChartLength: 0
              },
            });
            break;
          case "9"://二维码提示
            that.setData({
              codeDesc: value,
              alertShow: false,
              chartStatues: {
                maxChartLength: maxNum,
                currentChartLength: 0
              },
            });
            break;
          case "10"://班级课程title
            that.setData({
              classTitle: value,
              alertShow: false,
              chartStatues: {
                maxChartLength: maxNum,
                currentChartLength: 0
              },
            });
            break;
          default:
            
            break;
        };
      } else if (dataType == '1') {
        //机构列表内容赋值
        var dataList = that.data.institutionAdvList;
        dataList[positionIndex].AdvantageContent = value;
        that.setData({
          institutionAdvList: dataList,
          alertShow: false,
          chartStatues: {
            maxChartLength: maxNum,
            currentChartLength: 0
          },
        });
      } 
    } else {
      this.setData({
        coverShow: false,
      })
    }
  },

  /**
   * 展示输入弹框
   */
  changeText:function(e){
    //清空输出框
    this.setData({
      textareaValue: "",
      alertShow: true,
      currentInputValue: e.currentTarget.dataset.id,
      textareaType: e.currentTarget.dataset.type,
    });
  },

  /**
   * 展示保存弹框
   */

  saveClick:function(){
    this.setData({
      coverShow: true,
    });
  },

  /**
   * 修改图片的方法
   */
  changeImage:function(e){
    var that = this;
    var positionIndex = e.currentTarget.dataset.id;
    var dataType = e.currentTarget.dataset.type;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: getApp().data.host + "/api/Account/UploadImage",
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            var data = JSON.parse(res.data);
            if (data.Msg) {
              //判断点击类型
              if (dataType == '0') {
                //单个点击事件
                switch (positionIndex) {
                  case "1"://顶部banner
                    that.setData({
                      headImg: data.Info.Url
                    });
                    break;
                  case "2"://机构头像
                    that.setData({
                      courseImg: data.Info.Url
                    });
                    break;
                  case "3"://机构二维码
                    that.setData({
                      classImg: data.Info.Url
                    });
                    break;
                  case "4"://机构二维码
                    that.setData({
                      peopleImg: data.Info.Url
                    });
                    break;
                  case "5"://机构二维码
                    that.setData({
                      schoolImg: data.Info.Url
                    });
                    break;
                  case "6"://机构二维码
                    that.setData({
                      codeImg: data.Info.Url
                    });
                    break;
                  default:
                    break;
                }
              } else if (dataType == '1') {
                //机构列表图片转换
                var dataList = that.data.institutionAdvList;
                dataList[positionIndex].AdvantageImgeUrl = data.Info.Url;
                that.setData({
                  institutionAdvList: dataList
                });
              } 
            } else {
              wx.setTopBarText({
                text: data.Message
              })
            }
          }
        })


      }
    })
  }
})
