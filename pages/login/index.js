// pages/login/index.js
import { GetLogin, getSign } from './../../utils/axios.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name: '',
    password: '',
    bodyBtn: false
  },
  /**事件 */
  //登录
  login() {
    let that = this;
    let { user_name, password } = that.data;
    if (user_name && password) {
      that.getLogin(res => {
        wx.setStorageSync('status', status);
        wx.setStorageSync('venues_id', venues_id);
        if (res.status == 0) {
          wx.reLaunch({
            url: '../registeredVenue/index?id=' + res.id + '&status=' + res.status
          })
        } else if (res.status == 1) {
          wx.reLaunch({
            url: '../registeredVenue/index?id=' + res.id + '&status=' + res.status
          })
        } else if (res.status == 2) {
          wx.switchTab({
            url: '../index/index'
          })
        } else {
          wx.reLaunch({
            url: '../registeredVenue/index??id=' + res.id + '&status=' + res.status + '&reason=' + res.reason
          })
        }
      })
    } else {
      wx.showToast({
        title: '请输入账户或密码 !',
        icon: 'none',
      })
      return false
    }
  },
  //表单输入 输入监听
  inputWatch(e) {
    let that = this;
    let item = e.currentTarget.dataset.model;
    that.setData({
      [item]: e.detail.value
    });
    let {
      user_name,
      password
    } = that.data;
    if (user_name && password) {
      that.setData({
        bodyBtn: true
      });
    } else {
      that.setData({
        bodyBtn: false
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app);
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

  /**API */
  getLogin(callback) {
    let that = this;
    let {
      user_name,
      password
    } = that.data,
      user_id = app.globalData.user_id;
    GetLogin({
      user_id: user_id,
      user_name: user_name,
      password: password,
      sign: getSign(`user_id=${user_id}&user_name=${user_name}&password=${password}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res)
        callback && callback(res.data.Response)
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  }
})