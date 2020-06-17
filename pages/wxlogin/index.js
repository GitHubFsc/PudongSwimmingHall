// pages/wxlogin/index.js
import {getSign} from './../../utils/axios.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg : '请先获取手机号码 !',
    loginType : 0,
    loginFlag : false
  },
  //事件
  handlerGobackClick(delta) {
    const pages = getCurrentPages();
    if (pages.length >= 2) {
      wx.navigateBack({
        delta: delta
      });
    } else {
      wx.navigateTo({
        url: '/pages/index/index'
      });
    }
  },
  handlerGohomeClick() {
    wx.navigateTo({
      url: '/pages/index/index'
    });
  },
  /**事件 */
  wxlogin(){
    let that = this;
    that.setData({
      loginFlag: true
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

  },
  /**WX API */
  //获取手机号
  getPhoneNumber(e){
    let that = this;
    that.setData({
      loginFlag : false
    })
    app.getPhoneNumber(e, data=> {
      console.log("手机号回调", data)
      if (data) {
        that.setData({
          loginType : 1,
          loginFlag : true,
          msg : '请获取用户信息 !',
        })
      }
    })
  },
   //获取用户信息
  getUserInfo(e) {
    let that = this;
    that.setData({
      loginFlag: false
    })
    app.getUserInfo(e, (data) => {
      console.log("用户回调", data)
      if (data) {
        that.setData({
          loginType : 2,
          loginFlag : false
        })
        that.UserLogin()
      }
    })
  },
  //用户登录
  UserLogin(){
    app.postUserLogin(data=> {
      console.log("登录回调", data)
      if(data){
        wx.navigateTo({
          url: './../login/index'
        })
      }
    })
  },
})