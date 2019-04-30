// pages/one/one.js
let main = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

      mainPage:{},
      "imageUrls":[
        {
          "napath":"../navigatorone/navigatorone",
          "imgpath":"http://92uu43.natappfree.cc/images/s1.png"
        },
        {
          "napath": "../navigatortwo/navigatortwo",
          "imgpath": "http://92uu43.natappfree.cc/images/s2.png"
        },
        {
          "napath": "../navigatorthree/navigatorthree",
          "imgpath": "http://92uu43.natappfree.cc/images/s3.png"
        }
      ],

      "funcIcons":[
        {
          "type":"top",
          "funcName":"头条新闻",
          "iconPath":"http://92uu43.natappfree.cc/images/toutiao.png"
        },
        {
          "type": "shehui",
          "funcName": "社会新闻",
          "iconPath": "http://92uu43.natappfree.cc/images/shehui.png"
        },
        {
          "type": "guonei",
          "funcName": "国内新闻",
          "iconPath": "http://92uu43.natappfree.cc/images/guonei.png"
        },
        {
          "type": "guoji",
          "funcName": "国际新闻",
          "iconPath": "http://92uu43.natappfree.cc/images/guoji.png"
        },
        {
          "type": "yule",
          "funcName": "娱乐娱乐",
          "iconPath": "http://92uu43.natappfree.cc/images/yule.png"
        },
        {
          "type": "tiyu",
          "funcName": "体育新闻",
          "iconPath": "http://92uu43.natappfree.cc/images/tiyu.png"
        },
        {
          "type": "junshi",
          "funcName": "军事新闻",
          "iconPath": "http://92uu43.natappfree.cc/images/junshi.png"
        },
        {
          "type": "keji",
          "funcName": "科技新闻",
          "iconPath": "http://92uu43.natappfree.cc/images/keji.png"
        },
        {
          "type": "caijing",
          "funcName": "财经新闻",
          "iconPath": "http://92uu43.natappfree.cc/images/caijing.png"
        },
        {
          "type": "shishang",
          "funcName": "时尚新闻",
          "iconPath": "http://92uu43.natappfree.cc/images/shishang.png"
        },
        {
          "funcName": "天气",
          "iconPath": "http://92uu43.natappfree.cc/images/tianqi.png"
        },
        {
          "funcName": "身份证查询",
          "iconPath": "http://92uu43.natappfree.cc/images/chaxun.png"
        },
        {
          "funcName": "笑话",
          "iconPath": "http://92uu43.natappfree.cc/images/xiaohua.png"
        },
        {
          "funcName": "视频",
          "iconPath": "http://92uu43.natappfree.cc/images/shipin.png"
        },
        {
          "funcName": "音乐",
          "iconPath": "http://92uu43.natappfree.cc/images/yinyue.png"
        },

      ],
      "bottomNavBar":[
        {
          "barName":"首页",
          "barIcon":"http://92uu43.natappfree.cc/images/shouye.png" 
        },
        {
          "barName": "其他",
          "barIcon": "http://92uu43.natappfree.cc/images/qita.png"
        },
        {
          "barName": "我的",
          "barIcon": "http://92uu43.natappfree.cc/images/wode.png"
        },
      ]
  },

  /**
   * 功能导航
   */
  funcNav(e){
    console.log(e.currentTarget.dataset.navto)
    let navto = e.currentTarget.dataset.navto
    // wx.navigateTo({
    //   url: '../news/news/news?type=' + type +'&key=8f131a1bc8f563058445b64a888ef029',
    //   success: function(res) {
    //   },
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })

    wx.navigateTo({
      url: navto,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that = this

    // if (JSON.stringify(main.globalData.pageDatas)=="{}"){

    //   wx.request({
    //     url: 'http://jsttsa.natappfree.cc/text/china_text.json',
    //     header: { 'content-type': "json" },
    //     success: function (res) {
    //       that.setData({ mainPage: res.data.main })
    //     },
    //   })
    // } else{
    //   // console.log("从全局变量获取数据")
    //   this.setData({ mainPage: main.globalData.pageDatas.main })
    // }   

    setTimeout(function(){
      if (JSON.stringify(main.globalData.pageDatas) == "{}") {

        wx.request({
          url: 'http://logic.natapp1.cc/text/china_text.json',
          header: { 'content-type': "json" },
          success: function (res) {
            console.log("重新获取数据")
            that.setData({ mainPage: res.data.main })
          },
        })
      } else {
        console.log("main.js从全局变量获取数据")
        that.setData({ mainPage: main.globalData.pageDatas.main })
        console.log(main.globalData.pageDatas.main)
      } 
    },500)

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