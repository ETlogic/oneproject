// pages/music/musicplay/musicplay.js
let music = getApp()
const backgroundAudio = getApp().globalData.backgroundAudio

Page({

  /**
   * 页面的初始数据
   */
  data: {
    music:null,
    url: null,
    name: null,
    author:null,
    img: null,
    isplay: music.globalData.musicIsPlay,        //播放状态
    currentMusic: null, //当前播放音乐id
    previousMusic: null,  //上一首音乐id
    musicDuration:null,   //音乐时长
    currentPosition:null, //当前时长
    sliderMax:null,
    sliderValue:null,
    playMode: null, //播放模式 0:循环 1:随机 2:单曲

    animationDatas: "",
    rotateIndex: 0
  },

  /**
   * 播放上一首
   */
  previous(){
    let previousMusic = Number(this.data.currentMusic) - 1

    if(previousMusic<0){
      previousMusic = this.data.music.musiclist.length - 1
    }

    backgroundAudio.src = this.data.music.musiclist[previousMusic].src
    backgroundAudio.title = this.data.music.musiclist[previousMusic].name
    music.globalData.currentMusic = previousMusic
    this.setData({
      img: this.data.music.musiclist[previousMusic].img,
      currentMusic: previousMusic
    })
  },

  /**
   * 播放下一首
   */
  next(){
    let nextMusic = null 

    if (this.data.playMode == 0 || this.data.playMode == 2){
      nextMusic = Number(this.data.currentMusic) + 1

      if (nextMusic > (this.data.music.musiclist.length - 1)) {
        nextMusic = 0
      }
    }
    else{
      nextMusic = Math.floor(Math.random() * this.data.music.musiclist.length)

    }

    backgroundAudio.src = this.data.music.musiclist[nextMusic].src
    backgroundAudio.title = this.data.music.musiclist[nextMusic].name
    music.globalData.currentMusic = nextMusic
    this.setData({
      img: this.data.music.musiclist[nextMusic].img,
      currentMusic: nextMusic
    })
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
    console.log(music.globalData.playMode)
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


  start(n) {
    console.log("开始动画")
    console.log(this.data.rotateIndex)

    this.timeInterval = setInterval(() => {
      this.data.rotateIndex = this.data.rotateIndex + 1
      console.log("rotateIndex:"+this.data.rotateIndex)
      this.animation.rotate(15 * (this.data.rotateIndex)).step()
      this.setData({ animationDatas: this.animation.export() })
    }, 1000)

  },

  stop() {
    console.log("暂停动画")
    if (this.timeInterval > 0) {
      clearInterval(this.timeInterval)
    }
    this.timeInterval = 0;
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
    console.log(music.globalData.playMode)
    this.setData({ 
      isplay: music.globalData.musicIsPlay,
      currentMusic: options.currentMusic, 
      previousMusic:options.previousMusic,
      music: music.globalData.pageDatas.music,
      playMode: music.globalData.playMode
    })

    //定义动画参数
    let animation = wx.createAnimation({
      duration: 1000,
      timingFunction: "linear"
    })

    this.animation = animation

    this.start()

    //获取音乐播放时长，当前播放时长
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
      // console.log("播放音乐")

      this.stop()
      this.start()
    })

    //暂停监听事件
    backgroundAudio.onPause(() => {
      music.globalData.musicIsPlay = false
      this.setData({ isplay: music.globalData.musicIsPlay })

      this.stop()
      // console.log("暂停音乐")
    })

    //加载监听事件
    backgroundAudio.onWaiting(() => {
      wx: wx.showToast({
        title: '歌曲加载中',
        icon: 'none',
        duration: 3000,
      })
    })


    //监听自然播放结束事件
    backgroundAudio.onEnded(()=>{
      if (this.data.playMode == 0 || this.data.playMode == 1){
          this.next()
      }
      else{
        backgroundAudio.src = this.data.music.musiclist[this.data.currentMusic].src
        backgroundAudio.title = this.data.music.musiclist[this.data.currentMusic].name
      }

      //清空定时函数
      this.stop()
      // this.setData({ rotateIndex:0})
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