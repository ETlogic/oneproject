// pages/vedio/vedio.js
let video = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video:{},
    src:"",
    title:"",
    selectIndex:"",
    isShow:true,
    danmu: [{
      text: '第 1s 出现的弹幕',
      color: '#ff0000',
      time: 1
    },
    {
      text: '第 3s 出现的弹幕',
      color: '#ff00ff',
      time: 3
    }]
  },

  /**
   * 选集播放
   */
  selectVideo(e){
    console.log(e.currentTarget.dataset)
    let title = "第" + (e.currentTarget.dataset.index + 1)+ "集"+ e.currentTarget.dataset.item.name
    
    this.setData({ src: e.currentTarget.dataset.item.src, title: title, selectIndex: e.currentTarget.dataset.index})

  },

  /**
   * 显示视屏简介
   */

  showContent(){
    this.setData({ isShow: !this.data.isShow})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(video.globalData.pageDatas.video) 
    this.setData({ video: video.globalData.pageDatas.video})
    
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