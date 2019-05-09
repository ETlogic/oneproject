// pages/news/news2/news2.js
let news = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      currentIndex :0,
      scrollleft:0,
      toview:"toutiao",
      news:{},
      newslist:[]
  },

  /**
   * 切换选项卡
   */
  changeCurrent(e){
    // console.log("changge")
    let current = e.currentTarget.dataset.current
    this.setData({ currentIndex: current});
  },

  /**
   * 获取新闻数据
   */

  getNewsList(){
    let url = this.data.news.requestUrl
    let key = this.data.news.key
    let type= this.data.toview 
    let that = this
    let list=[]

    wx.request({
      url: url + '?type=' + type + '&key=' + key,
      success: function (res) {
        console.log(res.data)
        let newslist = list.concat(res.data.result.data)
        // setTimeout(that.setData({ newslist: newslist }),2000)
        that.setData({ newslist: newslist })
      }
    })
  },

  /**
   * 查看新闻详情
   */
  checkdetail(event) {
    console.log(event)
    let newsurl = event.currentTarget.dataset.url
    wx.navigateTo({
      url: '../newsdetail/newsdetail?newsurl=' + newsurl,
    })
  },

  switchTab(e){
    console.log(e)
    let that=this
    let current = e.detail.current
    let toview = e.detail.currentItemId

    this.setData({ newslist: [] })

    //设置选项卡当前位置
    this.setData({ currentIndex: current })
    this.setData({ toview: toview})

    //获取新闻数据
    setTimeout(function(){
      that.getNewsList()
    },500)
    // this.getNewsList()

  },

  bscroll(e){
    // console.log(e);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //加载新闻页面数据
    this.setData({ news: news.globalData.pageDatas.news})

    //获取新闻数据列表
    this.getNewsList()
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