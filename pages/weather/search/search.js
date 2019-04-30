// pages/weather/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:"",
    currentcity:""
  },


  /**
   * 获取input输入值
   */
  searchCity(e){
    let city = e.detail.value
    this.setData({city:city})
  },

  /**
   * 按城市搜索天气 
   */
  serach(){
    let city = this.data.city
    wx.navigateTo({
      url: '../weather/weather?city='+city,
    })
  },

  /**
   * 查询热门城市天气
   */
  showCityWeather(e){
    let city = e.currentTarget.dataset.city
    wx.navigateTo({
      url: '../weather/weather?city=' + city,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //保存当前城市
    this.setData({ currentcity: options.currentcity})

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