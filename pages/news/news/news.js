// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      key:{},
      type:{},
      newsdata:[],
  },


 /**
   * 查看新闻详情
   */
  checkdetail(event){
    console.log(event)
    let newsurl = event.currentTarget.dataset.url
    wx.navigateTo({
      url: '../newsdetail/newsdetail?newsurl='+newsurl,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      let that = this

      this.setData({
        key: options.key,
        type: options.type
      })
      
      wx.request({
        url: 'http://v.juhe.cn/toutiao/index?type=' + options.type + '&key=' + options.key,
        header:{'content-type':'json'},
        success:function(res){
          let newsList = that.data.newsdata.concat(res.data.result.data);
          that.setData({ newsdata: newsList })
          console.log(that.data.newsdata)
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