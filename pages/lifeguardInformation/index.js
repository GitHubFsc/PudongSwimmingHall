// pages/lifeguardInformation/index.js
import { GetLifeguardList, getSign } from './../../utils/axios.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    LifeguardList :[],
    listFlag : true
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
  //添加救生员
  router_addLifeguard(){
    wx.navigateTo({
      url: '/pages/addLifeguard/index?type=0'
    });
  },
  /**事件 */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLifeguardList()
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
  getLifeguardList(){
    let user_id = wx.getStorageSync('user_id')?wx.getStorageSync('user_id') : 2,
    venues_id = wx.getStorageSync('venues_id')?wx.getStorageSync('venues_id') : 1;
    let {LifeguardList,listFlag} = this.data;
    GetLifeguardList({
      venues_id :venues_id ,
      user_id : user_id,
      sign : getSign(`venues_id=${venues_id}&user_id=${user_id}`)
    }).then(res=>{
      if(res.data.ErrCode == 0){
        console.log(res);
        LifeguardList = res.data.Response;
        LifeguardList.map(arr=>{
          arr.flag = false
        })
        if(LifeguardList.length<1){
          listFlag = false
        }
        this.setData({
          LifeguardList,
          listFlag
        })
      }else{
        wx.showToast({
          title: res.data.ErrCode,
          icon : 'none'
        })
      }
    })
  }
})