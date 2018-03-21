Component({
  "component": true,
  externalClasses: ['my-class'],
  behaviors: [],

  properties: {
    chartNumber: { // 属性名:字数限制个数
      type: Number, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: 120, // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: '_propertyChange' // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：
    },
  },
  data: {
    content:'',//用来存储用户输入信息
  }, // 私有数据，可用于模版渲染
  methods: {
    onMyButtonTap: function () {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    _myPrivateMethod: function () {
      // 内部方法建议以下划线开头
      this.replaceDataOnPath(['A', 0, 'B'], 'myPrivateData') // 这里将 data.A[0].B 设为 'myPrivateData'
      this.applyDataUpdates()
    },
    _propertyChange: function (newVal, oldVal) {

    }
  }
})