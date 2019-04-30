// pages/weather/weather/weather.js
let weather = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: {},
    // resultt: {
    //   "sk": {	/*当前实况天气*/
    //     "temp": "21",	/*当前温度*/
    //     "wind_direction": "西风",	/*当前风向*/
    //     "wind_strength": "2级",	/*当前风力*/
    //     "humidity": "4%",	/*当前湿度*/
    //     "time": "14:25"	/*更新时间*/
    //   },
    //   "today": {
    //     "city": "天津",
    //     "date_y": "2014年03月21日",
    //     "week": "星期五",
    //     "temperature": "8℃~20℃",	/*今日温度*/
    //     "weather": "晴转霾",	/*今日天气*/
    //     "weather_id": {	/*天气唯一标识*/
    //       "fa": "00",	/*天气标识00：晴*/
    //       "fb": "53"	/*天气标识53：霾 如果fa不等于fb，说明是组合天气*/
    //     },
    //     "wind": "西南风微风",
    //     "dressing_index": "较冷", /*穿衣指数*/
    //     "dressing_advice": "建议着大衣、呢外套加毛衣、卫衣等服装。",	/*穿衣建议*/
    //     "uv_index": "中等",	/*紫外线强度*/
    //     "comfort_index": "",/*舒适度指数*/
    //     "wash_index": "较适宜",	/*洗车指数*/
    //     "travel_index": "适宜",	/*旅游指数*/
    //     "exercise_index": "较适宜",	/*晨练指数*/
    //     "drying_index": ""/*干燥指数*/
    //   },
    //   "future": [	/*未来几天天气*/
    //     {
    //       "temperature": "28℃~36℃",
    //       "weather": "晴转多云",
    //       "weather_id": {
    //         "fa": "00",
    //         "fb": "01"
    //       },
    //       "wind": "南风3-4级",
    //       "week": "星期一",
    //       "date": "20140804"
    //     },
    //     {
    //       "temperature": "28℃~36℃",
    //       "weather": "晴转多云",
    //       "weather_id": {
    //         "fa": "00",
    //         "fb": "01"
    //       },
    //       "wind": "东南风3-4级",
    //       "week": "星期二",
    //       "date": "20140805"
    //     },
    //     {
    //       "temperature": "27℃~35℃",
    //       "weather": "晴转多云",
    //       "weather_id": {
    //         "fa": "00",
    //         "fb": "01"
    //       },
    //       "wind": "东南风3-4级",
    //       "week": "星期三",
    //       "date": "20140806"
    //     },
    //     {
    //       "temperature": "27℃~34℃",
    //       "weather": "多云",
    //       "weather_id": {
    //         "fa": "01",
    //         "fb": "01"
    //       },
    //       "wind": "东南风3-4级",
    //       "week": "星期四",
    //       "date": "20140807"
    //     },
    //     {
    //       "temperature": "27℃~33℃",
    //       "weather": "多云",
    //       "weather_id": {
    //         "fa": "01",
    //         "fb": "01"
    //       },
    //       "wind": "东北风4-5级",
    //       "week": "星期五",
    //       "date": "20140808"
    //     },
    //     {
    //       "temperature": "26℃~33℃",
    //       "weather": "多云",
    //       "weather_id": {
    //         "fa": "01",
    //         "fb": "01"
    //       },
    //       "wind": "北风4-5级",
    //       "week": "星期六",
    //       "date": "20140809"
    //     },
    //     {
    //       "temperature": "26℃~33℃",
    //       "weather": "多云",
    //       "weather_id": {
    //         "fa": "01",
    //         "fb": "01"
    //       },
    //       "wind": "北风4-5级",
    //       "week": "星期日",
    //       "date": "20140810"
    //     }
    //   ]
    // },//天气查询请求数据

    weather:{}, //天气页面数据
          
    weatherImg:[],//七天预报天气图标

  },

  /**
   * 跳转城市查询界面
   */

  toSearchCity(e){
    let currentcity = e.currentTarget.dataset.currentcity
      wx.navigateTo({
        url: '../search/search?currentcity=' + currentcity,
        success: function(res) {},
        fail: function(res) {
          console.log("跳转城市页面失败")
          console.log(res);
        },
        complete: function(res) {},
      })
  },


  /**
   * 获取每日天气图标
   */

  getWeatherImg(){
    let weather = this.data.result.future
    let weatherImg = []
    let that = this

    
    weather.forEach((data, index) => {
      
      let fa = Number(data.weather_id.fa)
      
      if (fa == 0) {
        // console.log("晴天")
        weatherImg = weatherImg.concat([{
          "index": index,
          "imgPath": that.data.weather.weatherImg[0].imagePath,
        }])
        return
      }
      else if (fa == 1) {
        // console.log('多云')
        weatherImg = weatherImg.concat([{
          "index": index,
          "imgPath": that.data.weather.weatherImg[2].imagePath,
        }])
        return
      }
      else if (fa == 2) {
        // console.log('阴')
        weatherImg = weatherImg.concat([{
          "index": index,
          "imgPath": that.data.weather.weatherImg[1].imagePath,
        }])
        return
      }
      else if (2 <= fa <= 12) {
        // console.log('雨')
        weatherImg = weatherImg.concat([{
          "index": index,
          "imgPath": that.data.weather.weatherImg[3].imagePath,
        }])
        return
      }
      else if (13 <= fa <= 17 || 21 <= fa <= 28) {
        // console.log('雪')
        weatherImg = weatherImg.concat([{
          "index": index,
          "imgPath": that.data.weather.weatherImg[4].imagePath,
        }])
        return
      }
      else if (fa == 18 || fa == 53) {
        // console.log('雾或霾')
        weatherImg = weatherImg.concat([{
          "index": index,
          "imgPath": that.data.weather.weatherImg[5].imagePath,
        }])
        return
      }
      else if (fa == 19) {
        // console.log('冻雨')
        weatherImg = weatherImg.concat([{
          "index": index,
          "imgPath": that.data.weather.weatherImg[7].imagePath,
        }])
        return
      }
      else if (fa == 20 || 29 <= fa <= 31) {
        // console.log('沙城暴')
        weatherImg = weatherImg.concat([{
          "index": index,
          "imgPath": that.data.weather.weatherImg[6].imagePath,
        }])
        return
      }
    })
    console.log("输出weatherImg的值")
    console.log(weatherImg)
    that.setData({ weatherImg: weatherImg})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this

    //保存天气图片信息
    that.setData({ weather: weather.globalData.pageDatas.weather})
    
    if(JSON.stringify(options)=="{}"){
      //获取经纬度，查询天气信息
      wx.getLocation({
        success: function (res) {
          let format = that.data.weather.format
          let key = that.data.weather.key
          let lon = res.longitude
          let lat = res.latitude
          let url = that.data.weather.requestUrl[0].url + "?format=" + format + "&key=" + key + "&lon=" + lon + "&lat=" + lat
          console.log(url)
          // 根据经纬度请求天气信息
          wx.request({
            url: url,
            success:function(res){
             
              that.setData({ result: res.data.result})
              that.getWeatherImg()
            },
            fail:function(error){
              console.log("聚合服务请求天气失败："+error)
            }
          })  
        },
        fail: function (error) {
          console.log("获取经纬度错误：" + error)
        }
      })
    }
    else{
      let city=options.city
      let format = that.data.weather.format
      let key = that.data.weather.key
      let url = that.data.weather.requestUrl[1].url + "?format=" + format + "&key=" + key + "&cityname=" +encodeURI(city)
      console.log(url)

      wx.request({
          url: url,
          success:function(res){
            // console.log(res.data.result)
            that.setData({ result: res.data.result})
            that.getWeatherImg()
          },
          fail:function(error){
            console.log("聚合服务请求天气失败："+error.errMsg)
          }
        })  
     }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // let time = this.data.result.sk.time
    // wx.showToast({
    //   title: '天气于' + time + '更新',
    //   icon: 'none',
    //   duration: 2000,
    //   mask: true,
    //   success: function (res) { },
    //   fail: function (res) { },
    //   complete: function (res) { },
    // })
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
      wx.switchTab({
        url: '/pages/main/main',
        })
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