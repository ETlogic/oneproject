// pages/music/musicplay/musicplay.js
let music = getApp()
const backgroundAudio = getApp().globalData.backgroundAudio

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: null,
    name: null,
    author:null,
    img: null,
    isplay: music.globalData.musicIsPlay,        //播放状态
    currentMusic: null, //当前播放音乐id
    previousMusic: null,  //上一首音乐id
    musicDuration:null,
    currentPosition:null,
    sliderMax:null,
    sliderValue:null,
    playMode: music.globalData.playMode,
  },

  /**
   * 更改播放模式
   */

  changeMode(){
    let playMode= this.data.playMode+1
    if(playMode>2){
      playMode=0
    }

    this.setData({ playMode: playMode})
    music.globalData.playMode = playMode
  },

  /**
   * 修改播放进度
   */
  
  setPosition(e){
    console.log(e.detail.value)
    backgroundAudio.seek(e.detail.value)
  },

  /**
   * 播放音乐
   */
  clickPlay(){
    backgroundAudio.play()
  },

  /**
   * 暂停音乐
   */
  clickPause(){
    backgroundAudio.pause()
  },

  /**
   * 秒数转换成分秒格式00:00
   */
  formatSeconds(value) {
    var secondTime = parseInt(value);// 秒
    var minuteTime = 0;// 分
    var secondFormat = null
    var minuteFormat = null
    var result = null
    if (secondTime > 60) {//如果秒数大于60，将秒数转换成整数
      //获取分钟，除以60取整数，得到整数分钟
      minuteTime = parseInt(secondTime / 60);
      //获取秒数，秒数取佘，得到整数秒数
      secondTime = parseInt(secondTime % 60);
    }
    else if (secondTime<10){
      result = "00:0" + secondTime
      return result
    }
    else {
      result = "00:" + secondTime
      return result
    }

    if (secondTime < 10) {
      secondFormat = "0" + secondTime
    }
    else {
      secondFormat = secondTime
    }

    if (minuteTime < 10) {
      result = "0" + minuteTime + ":" + secondFormat;
    }
    else {
      result = minuteTime + ":" + secondFormat;
    }
    return result;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ 
      isplay: music.globalData.musicIsPlay,
      currentMusic: options.currentMusic, 
      previousMusic:options.previousMusic,
      music: music.globalData.pageDatas.music
    })


    wx.getBackgroundAudioPlayerState({
      success:(res)=>{
        console.log(res.duration)
        this.setData({ 
          musicDuration: this.formatSeconds(res.duration), 
          currentPosition: this.formatSeconds(res.currentPosition),
          sliderMax: res.duration,
          sliderValue: res.currentPosition
        })
      },
      fail:(error)=>{
        console.log(error)
      }
    })

    backgroundAudio.onTimeUpdate((res)=>{
      let secondTime = parseInt(backgroundAudio.currentTime)
      this.setData({ sliderValue: secondTime, currentPosition: this.formatSeconds(secondTime)})
    })

    //播放监听事件
    backgroundAudio.onPlay(() => {
      music.globalData.musicIsPlay = true
      this.setData({ isplay: music.globalData.musicIsPlay })
      console.log("播放音乐")
    })

    //暂停监听事件
    backgroundAudio.onPause(() => {
      music.globalData.musicIsPlay = false
      this.setData({ isplay: music.globalData.musicIsPlay })

      console.log("暂停音乐")
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },  

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})