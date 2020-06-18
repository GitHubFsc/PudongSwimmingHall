//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    user_id: ''
  },
  /**路由 */
  //我的场馆
  router_myVenue(){
    wx.navigateTo({
      url: './../myVenue/index',
    })
  },
  //救生员信息
  router_lifeguardInformation(){
    wx.switchTab({
      url: './../lifeguardInformation/index',
    })
  },
  //上岗及水质信息
  router_waterAndQuality(){
    wx.navigateTo({
      url: './../waterAndQuality/index',
    })
  },
  //场馆客流
  router_passengerFlow(){
    wx.navigateTo({
      url: './../passengerFlow/index',
    })
  },
  //重要通知
  router_importantNotice(){
    wx.switchTab({
      url: './../importantNotice/index',
    })
  },
  //事故汇报
  router_accidentReport(){
    wx.switchTab({
      url: './../accidentReport/index',
    })
  },
  /**事件 */
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // if (app.globalData.status) {
      this.setData({
        userInfo: app.globalData.userInfo,
        user_id: app.globalData.user_id,
      })
    // } else {
    //   wx.navigateTo({
    //     url: './../wxlogin/index'
    //   })
    // }
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

  },
})