//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    user_id: ''
  },
  /**路由 */

  /**事件 */
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.venue_id) {
      this.setData({
        userInfo: app.globalData.userInfo,
        user_id: app.globalData.user_id,
        hasUserInfo: true
      })
    } else {
      wx.navigateTo({
        url: './../wxlogin/index'
      })
    }
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