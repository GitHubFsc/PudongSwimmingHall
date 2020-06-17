// pages/registeredVenue/index.js
import {
  GetBusinesslicenseDemo,
  GetHighLevelPermit,
  GetSanitaryPermit,
  GetVenueHeadt,
  GetSwimmingPool,
  GetCertificationFormula,
  GetBuoyantApparatus,
  GetMonitoringAids,
  PostVenuesRegistered,
  getSign
} from './../../utils/axios.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: '',
    reason: '',
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
    examplesList : [false,false,false,false,false,false,false,false],
    loginFlag : false
  },
  /**路由 */
  /**事件 */
  //示例
  examples(e){
    let that = this;
    let examplesList =that.data.examplesList,
    index = e.currentTarget.dataset.index;
    examplesList[index] = !examplesList[index];
    that.setData({
      examplesList
    })
  },
  //文件上传
  fileUpload(e){
    let that = this;
    let name = e.currentTarget.dataset.name;
    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        let tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        that.postUploadFile(tempFilePaths,name);
      }
    })
  },
  //提交注册
  registered(){
    let that = this,
    data = that.data;
    if(!data.venues_name){
      wx.showToast({
        title: '请输入场馆名称',
        icon: 'none',
      })
      return false
    }
    if(!data.venues_another_name){
      wx.showToast({
        title: '请输入场馆别称',
        icon: 'none',
      })
      return false
    }
    if(!data.address){
      wx.showToast({
        title: '请输入经营地址',
        icon: 'none',
      })
      return false
    }
    if(!data.tel){
      wx.showToast({
        title: '请输入场馆电话',
        icon: 'none',
      })
      return false
    }
    if(!data.head_name){
      wx.showToast({
        title: '请输入场馆负责人姓名',
        icon: 'none',
      })
      return false
    }
    if(!data.head_mobile){
      wx.showToast({
        title: '请输入场馆负责人电话',
        icon: 'none',
      })
      return false
    }
    if(data.business_license.length<1){
      wx.showToast({
        title: '请上传营业执照',
        icon: 'none',
      })
      return false
    }
    if(data.high_risk_permit.length<1){
      wx.showToast({
        title: '请上传高危许可证照片',
        icon: 'none',
      })
      return false
    }
    if(!data.highlevelpermit_time){
      wx.showToast({
        title: '请选择高危许可证有效期',
        icon: 'none',
      })
      return false
    }
    if(data.sanitary_permit.length<1){
      wx.showToast({
        title: '请上传卫生许可证',
        icon: 'none',
      })
      return false
    }
    if(data.venue_head.length<1){
      wx.showToast({
        title: '请上传场馆门头照片',
        icon: 'none',
      })
      return false
    }
    if(data.swimming_pool.length<1){
      wx.showToast({
        title: '请上传泳池照片',
        icon: 'none',
      })
      return false
    }
    if(data.certificate_formula.length<1){
      wx.showToast({
        title: '请上传证照公式照片',
        icon: 'none',
      })
      return false
    }
    if(data.buoyant_apparatus.length<1){
      wx.showToast({
        title: '请上传救生器材照片',
        icon: 'none',
      })
      return false
    }
    if(data.monitoring_aids.length<1){
      wx.showToast({
        title: '请上传监控设备照片',
        icon: 'none',
      })
      return false
    }
    that.postVenuesRegistered(res=>{
      console.log(res);

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.status) {
      this.setData({
        venues_id: options.id,
        status: options.status,
        reason: options.reason,
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

  /**API */
  //营业执照片示例
  getBusinesslicenseDemo() {
    let business_license = this.data.business_license;
    GetBusinesslicenseDemo({
      rnd: 1,
      sign: getSign(`rnd=1`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.map(arr => {
          business_license.push(arr.img_url)
        })
        this.setData({
          business_license
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  },
  //高危许可证照片示例
  getHighLevelPermit() {
    let high_risk_permit = this.data.high_risk_permit;
    GetHighLevelPermit({
      rnd: 1,
      sign: getSign(`rnd=1`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.map(arr => {
          high_risk_permit.push(arr.img_url)
        })
        this.setData({
          high_risk_permit
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  },
  //卫生许可证照片示例
  getSanitaryPermit() {
    let sanitary_permit = this.data.sanitary_permit;
    GetSanitaryPermit({
      rnd: 1,
      sign: getSign(`rnd=1`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.map(arr => {
          sanitary_permit.push(arr.img_url)
        })
        this.setData({
          sanitary_permit
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  },
  //场馆门头照片示例
  getVenueHeadt() {
    let venue_head = this.data.venue_head;
    GetVenueHeadt({
      rnd: 1,
      sign: getSign(`rnd=1`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.map(arr => {
          venue_head.push(arr.img_url)
        })
        this.setData({
          venue_head
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  },
  //泳池照片示例
  getSwimmingPool() {
    let swimming_pool = this.data.swimming_pool;
    GetSwimmingPool({
      rnd: 1,
      sign: getSign(`rnd=1`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.map(arr => {
          swimming_pool.push(arr.img_url)
        })
        this.setData({
          swimming_pool
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  },
  //证照公式照片示例
  getCertificationFormula() {
    let certificate_formula = this.data.certificate_formula;
    GetCertificationFormula({
      rnd: 1,
      sign: getSign(`rnd=1`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.map(arr => {
          certificate_formula.push(arr.img_url)
        })
        this.setData({
          certificate_formula
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  },
  //救生器材照片示例
  getBuoyantApparatus() {
    let buoyant_apparatus = this.data.buoyant_apparatus;
    GetBuoyantApparatus({
      rnd: 1,
      sign: getSign(`rnd=1`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.map(arr => {
          buoyant_apparatus.push(arr.img_url)
        })
        this.setData({
          buoyant_apparatus
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  },
  //监控设备照片示例
  getMonitoringAids() {
    let monitoring_aids = this.data.monitoring_aids;
    GetMonitoringAids({
      rnd: 1,
      sign: getSign(`rnd=1`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.map(arr => {
          monitoring_aids.push(arr.img_url)
        })
        this.setData({
          monitoring_aids
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  },
  //场馆注册/修改
  postVenuesRegistered(callback){
    let datas = [];
    datas.push('user_id=' + app.globalData.user_id);
    datas.push('sign=' + getSign(`user_id=${app.globalData.user_id}`));
    let {venues_id,venues_name,venues_another_name,address,tel,head_name,head_mobile,highlevelpermit_time,business_license,
      high_risk_permit,sanitary_permit,venue_head,swimming_pool,certificate_formula,buoyant_apparatus,monitoring_aids,
    } = this.data;
    PostVenuesRegistered({
      body :{
        venues_id : venues_id,
        venues_name: venues_name,
        venues_another_name :venues_another_name,
        address :address,
        tel : tel,
        head_name:head_name,
        head_mobile :head_mobile,
        business_license :business_license ,
        high_risk_permit :high_risk_permit,
        highlevelpermit_time: highlevelpermit_time,
        sanitary_permit: sanitary_permit,
        venue_head:venue_head,
        swimming_pool: swimming_pool,
        certificate_formula :certificate_formula,
        buoyant_apparatus :buoyant_apparatus,
        monitoring_aids : monitoring_aids
      }
    },datas).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        callback && callback(res.data.Response)
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  },
  //文件上传
  postUploadFile(arr,name) {
    console.log(arr,name);
    let that = this;
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]);
      wx.uploadFile({
        url: 'https://youyongguan.zztv021.com/api/Lib/PostUploadFile?rnd=1&sign=' + getSign(`rnd=1`),
        filePath: arr[i],
        name: 'file',
        formData: {},
        success(res) {
          console.log("文件上传返回", res);
          var p = JSON.parse(res.data);
          console.log(p)
          if (p.ErrCode == 0) {
            name.push(p.Response)
            console.log("name", name);
            that.setData({
              [name] : name
            })
            wx.hideLoading()
          } else {
            wx.showToast({
              title: p.ErrMsg,
              icon: 'none'
            })
          }
        }
      })
    }
  },
})