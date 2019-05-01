// pages/numberQuery/numberQuery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      inputValue:"",
      data:{},//查询返回结果
      sid:""
  },

  /**
   * 获取输入框内容
   */
  getInput(e){
    this.setData({ inputValue: e.detail.value})
  },

  /**
   * 号码查询
   */
  numberQuery(){
    let value = this.data.inputValue
    
    wx.request({
      url: 'https://www.zhaotool.com/v1/wx/info',
      method: "post",
      data: { "q": value },
      success: (res) => {
        if(res.data.code==0)
        {
          this.setData({ data: res.data.data, sid: res.data.sid })
        }
        else if (res.data.code == 900){
          wx.showToast({
            title: '请输入正确卡号',
            duration:3000,
            icon:"none"
          })
        }
        
      },
      fail: (error) => {
        console.log(error)
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
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