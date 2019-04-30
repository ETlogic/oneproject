// pages/telephone/telephoneList/telephoneList.js
let telephone=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telephoneList:[]
  },

  phone(e){
    let number = e.currentTarget.dataset.number
    wx.makePhoneCall({
      phoneNumber:"number",
      success:(res)=>{
        console.log("电话拨打成功")
      },
      fail:(error)=>{
        console.log(error)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(telephone.globalData.pageDatas.telephone.telephoneList)
    let telephoneList = this.data.telephoneList.concat(telephone.globalData.pageDatas.telephone.telephoneList)
    this.setData({telephoneList:telephoneList})
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