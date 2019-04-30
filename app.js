//app.js
App({
  onLaunch: function () {
    let that=this

    wx.request({
      url: 'http://logic.natapp1.cc//text/china_text.json',
        header: {'content-type':"json"},
        success: function(res) {
          console.log("启动获取nginx文件数据成功")
          // console.log(res.data)
          that.globalData.pageDatas=res.data
        },
    })
  },

  globalData: {
    userInfo: null,
    pageDatas:{}
  }
})