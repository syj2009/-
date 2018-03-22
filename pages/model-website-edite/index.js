/************微班级编辑页面****************/
var P = require('../../lib/wxpage')
P('index', {
  data: {
    currentInputValue: '',//表示当前所在的input框的位置
    //判断点击的输入类型
    textareaType:'0',
    //输入框内的值
    textareaValue:'',
    //封面是否显示
    coverShow: false,
    //弹框状态
    alertShow: false,
    chartStatues: {
      maxChartLength: 120,
      currentChartLength: 0
    },
    //图片相关数据
    bannerImg: "../../image/modelDetail/website-banner.png",
    institutionImg: "../../image/modelDetail/banner001.png",
    codeImg: "../../image/modelDetail/banner002.png",
    //描述的相关数据
    institutionName:"会考吧学院",
    institutionDesc:"会考吧学院",
    codeDesc: "长按识别二维码，即刻加入课程微信群！",
    //机构列表的数据
    classTitle: "会考吧学院",
    institutionAdvList: [{
      AdvantageImgeUrl: "../../image/modelDetail/banner001.png",
      AdvantageContent: "会考吧学院",
    }],
    //培训项目列表
    projectTitle:"会考吧学院",
    projectList:[{
      ProjectImgeUrl:"../../image/modelDetail/banner001.png",
      ProjectContent:"会考吧学院"
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

  cancleClick: function (e) {
    if (e.currentTarget.dataset.id == '1') {
      this.setData({
        alertShow: false,
        textareaValue:''
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
  submitClick: function (e) {
    if (e.currentTarget.dataset.id == 1) {
      var dataType = this.data.textareaType;
      var positionIndex = this.data.currentInputValue;
      var value = this.data.textareaValue;
      var that = this;
      var maxNum = that.data.chartStatues.maxChartLength;
      if (dataType == '0') {
        //赋值
        switch (positionIndex) {
          case "1"://机构名字
            that.setData({
              institutionName: value,
              alertShow: false,
              chartStatues: {
                maxChartLength: maxNum,
                currentChartLength: 0
              },
            });
            break;
          case "2"://机构简介
            that.setData({
              institutionDesc: value,
              alertShow: false,
              chartStatues: {
                maxChartLength: maxNum,
                currentChartLength: 0
              },
            });
            break;
          case "3"://机构优势
            that.setData({
              classTitle: value,
              alertShow: false,
              chartStatues: {
                maxChartLength: maxNum,
                currentChartLength: 0
              },
            });
            break;
          case "4"://项目简介
            that.setData({
              projectTitle: value,
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
      } else if (dataType == '2') {
        //班级介绍内容赋值
        var dataList = that.data.projectList;
        dataList[positionIndex].ProjectContent = value;
        that.setData({
          projectList: dataList,
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
  changeText: function (e) {
    //清空输出框
    this.setData({
      textareaValue:"",
      alertShow: true,
      currentInputValue: e.currentTarget.dataset.id,
      textareaType: e.currentTarget.dataset.type,
    });
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
  changeImage: function (e) {
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
          url: getApp().data.host +"/api/Account/UploadImage", 
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            var data = JSON.parse(res.data);
            if (data.Msg){
              //判断点击类型
              if (dataType == '0') {
                //单个点击事件
                switch (positionIndex) {
                  case "1"://顶部banner
                    that.setData({
                      bannerImg: data.Info.Url
                    });
                    break;
                  case "2"://机构头像
                    that.setData({
                      institutionImg: data.Info.Url
                    });
                    break;
                  case "3"://机构二维码
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
              } else if (dataType == '2') {
                //班级介绍列表转换
                var dataList = that.data.projectList;
                dataList[positionIndex].ProjectImgeUrl = data.Info.Url;
                that.setData({
                  projectList: dataList
                });
              }
            }else{
              wx.setTopBarText({
                text: data.Message
              })
            }
          }
        })
         
        
      }
    })
  },

  /**
   * 机构官网/项目增加item
   */
  addItem:function(e){
    var dataType = e.currentTarget.dataset.id;
    var that = this;
    var arrList = that.data.institutionAdvList;
    var arrOrList = that.data.projectList
    if (dataType == '1'){
      arrList.push({
        AdvantageImgeUrl: "../../image/modelDetail/banner001.png",
        AdvantageContent: "会考吧学院",
      });
      that.setData({
        institutionAdvList: arrList
      })
    }else{
      arrOrList.push({
        ProjectImgeUrl: "../../image/modelDetail/banner001.png",
        ProjectContent: "会考吧学院"
      });
      that.setData({
        projectList: arrOrList
      })
    }
  },
  //保存提交数据
  saveClick:function(){
    var that = this;
    wx.request({
      url: getApp().data.host + "/api/Template/SaveTinyWebSite",
      data: {
        "Type": "1", //1：新增 2：编辑 
        "UserId": "1",//老师id
        "ProgrammerId": "19", //方案id 编辑使用
        "TrainingName": that.data.institutionName, 
        "TrainingLogo": that.data.institutionImg,
        "IntroduceTitle": that.data.institutionName,
        "IntroduceContent": that.data.institutionDesc,
        "IntroduceImgeUrl": that.data.bannerImg,
        "AdvantageTitle": that.data.classTitle,
        "ProjectTitle": that.data.projectTitle, 
        "QrCode": that.data.codeImg, 
        "QrCodeContent": that.data.codeDesc, 
        "CodeType": 2, //1:个人  2 群
        "AdvantageList": that.data.institutionAdvList,
        "ProjectList": that.data.ProjectList
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        if (res.data.Msg) {
        
        }
      },
    });
  }
})
