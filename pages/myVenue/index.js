// pages/myVenue/index.js
import {GetVenuesDetail,getSign} from './../../utils/axios.js';
const utils =  require('./../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    venues_id: '',
    venues_name: '',
    venues_another_name: '',
    address: '',
    tel: '',
    head_name: '',
    head_mobile: '',
    highlevelpermit_time: '',
    business_license: [],
    high_risk_permit: [],
    sanitary_permit: [],
    venue_head: [],
    swimming_pool: [],
    certificate_formula: [],
    buoyant_apparatus: [],
    monitoring_aids: [],
  },
  /**路由 */
  //返回上一页
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
  /**事件 */
  //图片预览
  previewImage(e){
    let that = this;
    let urls = that.data[e.currentTarget.dataset.model];
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    this.getVenuesDetail()
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
  //我的场馆信息
  getVenuesDetail() {
    let that = this,
      venues_id = wx.getStorageSync('venues_id')?wx.getStorageSync('venues_id'):1,
      user_id = wx.getStorageSync('user_id')?wx.getStorageSync('user_id') : 2;
    GetVenuesDetail({
      venues_id: venues_id,
      user_id: user_id,
      sign: getSign(`venues_id=${venues_id}&user_id=${user_id}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        that.setData({
          venues_name: res.data.Response.venues_name,
          venues_another_name: res.data.Response.venues_another_name,
          address: res.data.Response.address,
          tel: res.data.Response.tel,
          head_name: res.data.Response.head_name,
          head_mobile: res.data.Response.head_mobile,
          business_license: res.data.Response.business_license.map(arr => { return arr.img_url }),
          high_risk_permit: res.data.Response.high_risk_permit.map(arr => { return arr.img_url }),
          highlevelpermit_time: res.data.Response.highlevelpermit_timespan?utils.getDate(res.data.Response.highlevelpermit_timespan) : '2020-01-01',
          sanitary_permit: res.data.Response.sanitary_permit.map(arr => { return arr.img_url }),
          venue_head: res.data.Response.venue_head.map(arr => { return arr.img_url }),
          swimming_pool: res.data.Response.swimming_pool.map(arr => { return arr.img_url }),
          certificate_formula: res.data.Response.certificate_formula.map(arr => { return arr.img_url }),
          buoyant_apparatus: res.data.Response.buoyant_apparatus.map(arr => { return arr.img_url }),
          monitoring_aids: res.data.Response.monitoring_aids.map(arr => { return arr.img_url }),
        })
        wx.hideLoading()
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  },
})