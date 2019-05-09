// pages/music/music/music.js
let music = getApp()
const backgroundAudio = getApp().globalData.backgroundAudio

Page({

  /**
   * 页面的初始数据
   */
  data: {
    music:{},
    src:"" ,
    name: "",
    author: "",
    img:"",
    isplay: music.globalData.musicIsPlay,        //播放状态
    isDefault:true,       
    currentMusic:null, //当前播放音乐id
    previousMusic:null,  //上一首音乐id
    playMode: null, //播放模式 0:循环 1:随机 2:单曲
  },

  /**
  *选择音乐播放 
  */
  playMusic(e){
    console.log(e)
    let src = e.currentTarget.dataset.music.src
    let author = e.currentTarget.dataset.music.author
    let name = e.currentTarget.dataset.music.name
    let img = e.currentTarget.dataset.music.img
    let currentMusic = e.currentTarget.id

    this.setData({previousMusic:this.data.currentMusic})
    this.setData({ src: src, name: name, author: author, img: img, isDefault: false, currentMusic: currentMusic}) 
    music.globalData.currentMusic = currentMusic

    backgroundAudio.src = src

    backgroundAudio.title= name

  },

  /**
     * 播放下一首
     */
  next() {
    let nextMusic = null

    if (this.data.playMode == 0 || this.data.playMode == 2) {
      nextMusic = Number(this.data.currentMusic) + 1

      if (nextMusic > (this.data.music.musiclist.length - 1)) {
        nextMusic = 0
      }
    }
    else {
      nextMusic = Math.floor(Math.random() * this.data.music.musiclist.length)

    }

    backgroundAudio.src = this.data.music.musiclist[nextMusic].src
    backgroundAudio.title = this.data.music.musiclist[nextMusic].name
    music.globalData.currentMusic = nextMusic
    this.setData({
      img: this.data.music.musiclist[nextMusic].img,
      name: this.data.music.musiclist[nextMusic].name,
      author: this.data.music.musiclist[nextMusic].author,
      currentMusic: nextMusic
    })
  },


  /**
   * 暂停音乐
   */
  musicPause(){
    backgroundAudio.pause()
  },

  /**
   * 播放音乐
   */
  musicPlay(){

    if (this.data.isDefault){
      backgroundAudio.src = this.data.src
      backgroundAudio.title = this.data.name
      this.setData({ previousMusic: this.data.currentMusic})
      this.setData({ isDefault: false, currentMusic: music.globalData.currentMusic})
    }
    else{
      backgroundAudio.play()
    }
  },

  /**
   * 跳转播放详情页
   */
  musicDetail(){
    wx.navigateTo({
      url: '/pages/music/musicplay/musicplay?currentMusic=' + this.data.currentMusic + "&previousMusic=" + this.data.previousMusic,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //保存music变量
    let music1 = music.globalData.pageDatas.music
    let currentMusic = music.globalData.currentMusic

    //设置自动播放
    // backgroundAudio.autoplay=true

    //设置默认播放歌曲
    this.setData({ 
      music: music1, 
      src: music1.musiclist[currentMusic].src, 
      name: music1.musiclist[currentMusic].name,
      author: music1.musiclist[currentMusic].author,
      img: music1.musiclist[currentMusic].img,
      isplay: music.globalData.musicIsPlay,
      currentMusic: music.globalData.currentMusic,
      playMode: music.globalData.playMode
      })

    //播放监听事件
    backgroundAudio.onPlay(()=>{
      music.globalData.musicIsPlay = true
      this.setData({ isplay: music.globalData.musicIsPlay})
      console.log("播放音乐")
    })

    //暂停监听事件
    backgroundAudio.onPause(()=>{
      music.globalData.musicIsPlay = false
      this.setData({ isplay: music.globalData.musicIsPlay })

      console.log("暂停音乐")
    })

    backgroundAudio.onWaiting(()=>{
      wx:wx.showToast({
        title: '歌曲加载中',
        icon: 'none',
        duration: 3000,
      })
    })

    //监听自然结束
    backgroundAudio.onEnded(()=>{
      if (this.data.playMode == 0 || this.data.playMode == 1) {
        this.next()
      }
      else {
        backgroundAudio.src = this.data.music.musiclist[this.data.currentMusic].src
        backgroundAudio.title = this.data.music.musiclist[this.data.currentMusic].name
      }
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
    this.onLoad()
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