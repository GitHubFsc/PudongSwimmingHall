//app.js
import {Getopenid,Postdecryption,PostUserLogin,getSign} from './utils/axios.js';
import page from './utils/page';
App({
  onLaunch: function () {
    Page = page;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        Getopenid({
          code: res.code,
          rnd: 1,
          sign: getSign(`code=${res.code}&rnd=1`)
        }).then(res => {
          if (res.data.ErrCode == 0) {
            wx.setStorageSync('openid', res.data.Response);
            this.globalData.openid = res.data.Response
          } else {
            wx.showToast({
              title: res.data.ErrMsg,
              icon: "none"
            })
          }
        })
      }
    })
  },
  //获取手机号
  getPhoneNumber(e, callback) {
    wx.login({
      success: (result) => {
        let datas = ['sign=' + getSign('')]
        Postdecryption({
          body: {
            iv: e.detail.iv,
            encryptedData: e.detail.encryptedData,
            code: result.code,
          }
        }, datas).then(res => {
          if (res.data.ErrCode == 0) {
            wx.setStorageSync('mobile', res.data.Response.str.phoneNumber)
            this.globalData.mobile = res.data.Response.str.phoneNumber
            callback && callback(res.data.Response.str)
          } else {
            wx.showToast({
              title: res.data.ErrMsg,
              icon: 'none',
            })
          }
        })
      },
    })
  },
  //获取用户信息
  getUserInfo(e, callback) {
    wx.login({
      success: (result) => {
        let datas = ['sign=' + getSign('')]
        Postdecryption({
          body: {
            iv: e.detail.iv,
            encryptedData: e.detail.encryptedData,
            code: result.code,
          }
        }, datas).then(res => {
          if (res.data.ErrCode == 0) {
            wx.setStorageSync('userInfo', res.data.Response.str)
            this.globalData.userInfo = res.data.Response.str
            callback && callback(res.data.Response.str)
          } else {
            wx.showToast({
              title: res.data.ErrMsg,
              icon: 'none',
            })
          }
        })
      },
    })
  },
  //用户登录
  postUserLogin(callback){
    let datas = ['rnd=1','sign=' + getSign(`rnd=1`)]
    let userInfo = this.globalData.userInfo;
    PostUserLogin({
      body :{
        nickname : userInfo.nickName,
        avatar : userInfo.avatarUrl,
        sex : userInfo.gender,
        openid : this.globalData.openid,
        mobile : this.globalData.mobile,
      }
    },datas).then(res => {
      if (res.data.ErrCode == 0) {
        wx.setStorageSync('user_id', res.data.Response.user_id)
        this.globalData.user_id = res.data.Response.user_id
        callback && callback(res.data.Response)
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  },
  globalData: {
    venue_id : null,
    status : null,
    openid :  null,
    mobile : null,
    user_id : null,
    userInfo: null,
  }
})