// pages/scan/scan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      barCode:"",
      cityId:"",
      productInfo: {},
      errorReason:"",
      current:0
  },

  /**
   * 扫描条形码
   */
  scanBarCode(){
    this.setData({productInfo:{},errorReason:""})

      wx.scanCode({
        success:(res)=>{
          this.setData({ barCode:res.result})

          // 获取商品信息
          wx.request({
            url: 'http://api.juheapi.com/jhbar/bar?appkey=8bd7de40734d21e19fc1a85dd257eb02&pkg=com.logic.test&barcode='+this.data.barCode+'&cityid='+this.data.cityId,
            success:(res)=>{
              console.log(res.data)
              //error_code=0返回数据
              if(res.data.error_code==0){
                this.setData({ productInfo:res.data.result})
              }
              else{
                this.setData({ errorReason: res.data.reason})
              }
            }
          })
        }
      })
  },            

  /**
   * 选项卡切换
   */

  selectCurrent(e){
    // console.log(e.currentTarget.id)
    this.setData({ current: e.currentTarget.id})
  },

  changeCurrent(e){
    // console.log(e.detail.current)
    this.setData({ current: e.detail.current })
  },

  /**
   * 跳转电商页面
   */
  goShoping(e){
    let dsid = e.currentTarget.dataset.dsid

    //获取商品购买地址
    wx.request({
      url: 'http://api.juheapi.com/jhbar/buy?appkey=8bd7de40734d21e19fc1a85dd257eb02&pkg=com.logic.test&barcode=' + this.data.barCode+'&dsid='+ dsid,
      success:(res)=>{
        console.log(res)
        if (res.data.error_code==0){
          let url = res.data.result
          console.log('商品网址:' + url)
          wx.navigateTo({
            url: '/pages/scan/shopping/shopping?url=' + url,
          })
        }
        else{
          wx.showToast({
            title: res.data.reason,
            icon: "none",
            duration:3000
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let city="北京市"

    // 查询当前城市id
    wx.request({
      url: 'http://api.juheapi.com/jhbar/city?appkey=8bd7de40734d21e19fc1a85dd257eb02&pkg=com.logic.test',
      success: (res) => {
        let result = res.data.result

        result.some((data, index) => {
          if (data.cityName == city) {
            this.setData({ cityId:data._id})
            console.log("当前城市数据:"+data)
            return true
          }
        })
      }
    })

    setTimeout(this.scanBarCode(),500)

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