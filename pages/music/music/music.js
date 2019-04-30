// pages/music/music/music.js
let music = getApp()
let innerAudioContext = wx.createInnerAudioContext()

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
    isplay:false,
    isDefault:true,
    currentMusic:"none"
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

    // wx.navigateTo({
    //   url: '/pages/music/musicplay/musicplay?url=' + url+'&author='+author+"&name="+name,
    // })
    this.setData({ src: src, name: name, author: author, img: img, isDefault: false, currentMusic: currentMusic}) 

    innerAudioContext.src = src


  },

  /**
   * 暂停音乐
   */
  musicPause(){
    innerAudioContext.pause()

  },

  /**
   * 播放音乐
   */
  musicPlay(){

    if (this.data.isDefault){
      innerAudioContext.src = this.data.src
      this.setData({ isDefault: false, currentMusic:0})

    }
    else{
      innerAudioContext.play()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //保存music变量
    let music1 = music.globalData.pageDatas.music

    //设置自动播放
    innerAudioContext.autoplay=true

    //设置默认播放歌曲
    this.setData({ 
      music: music1, 
      src: music1.musiclist[0].src, 
      name: music1.musiclist[0].name,
      author: music1.musiclist[0].author,
      img: music1.musiclist[0].img
      })

    //播放监听事件
    innerAudioContext.onPlay(()=>{
      this.setData({ isplay:true})
    })

    //暂停监听事件
    innerAudioContext.onPause(()=>{
      this.setData({ isplay: false })
    })

    innerAudioContext.onWaiting(()=>{
      wx:wx.showToast({
        title: '歌曲加载中',
        icon: 'none',
        duration: 3000,
      })
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
    innerAudioContext.destroy()
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