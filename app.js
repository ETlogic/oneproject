//app.js
App({
  onLaunch: function () {
    
    //获取nginx文案数据
    wx.request({
      url: 'http://logic.natapp1.cc//text/china_text.json',
        header: {'content-type':"json"},
        success: (res)=>{
          console.log("启动获取nginx文件数据成功")
          // console.log(res.data)
          this.globalData.pageDatas=res.data
        },
    })

    //创建backgroundAudio对象
    this.globalData.backgroundAudio=wx.getBackgroundAudioManager()

  },

  globalData: {
    userInfo: null,
    pageDatas:{},
    backgroundAudio : null,
    musicIsPlay:null,
    currentMusic:0,
    playMode:0
  }
})