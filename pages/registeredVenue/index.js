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
  GetVenuesDetail,
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
    examplesList : [
      {flag:false,imglist:[]},
      {flag:false,imglist:[]},
      {flag:false,imglist:[]},
      {flag:false,imglist:[]},
      {flag:false,imglist:[]},
      {flag:false,imglist:[]},
      {flag:false,imglist:[]},
      {flag:false,imglist:[]}],
    loginFlag : false
  },
  /**路由 */
  /**事件 */
  //示例
  examples(e){
    let that = this;
    let examplesList =that.data.examplesList,
    index = e.currentTarget.dataset.index;
    examplesList[index].flag = !examplesList[index].flag ;
    that.setData({
      examplesList
    })
  },
  //文件上传
  fileUpload(e){
    let that = this;
    that.data.model = e.currentTarget.dataset.model
    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        that.postUploadFile(res.tempFilePaths);
      }
    })
  },
  // 输入监听
  inputWatch(e) {
    console.log(e);
    let item = e.currentTarget.dataset.model;
    this.setData({
        [item]: e.detail.value
    });
    console.log([item],this.data)
  },
  //图片预览
  previewImage(e){
    let that = this;
    let urls = that.data[e.currentTarget.dataset.model];
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  //删除图片
  delete(e) {
    let that = this;
    let model = e.currentTarget.dataset.model
    let imglist = that.data[model];
    imglist.splice(e.currentTarget.dataset.index, 1);
    that.setData({
      [model] : imglist
    })
  },
  //高危许可证有效期
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      highlevelpermit_time: e.detail.value
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
  //取消
  cancel(){
    let that = this;
    that.setData({
      loginFlag: false
    })
  },
  //确认 / 去更改
  confirm(){
    let that = this;
    let status = that.data.status;
    if(status==1){
      console.log('审核中');
    }else{
      console.log('审核失败')
    }
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
        loginFlag : true 
      })
      if(options.status==1 || options.status==3){
        this.getVenuesDetail()
      }
      this.getBusinesslicenseDemo();
      this.getHighLevelPermit();
      this.getSanitaryPermit();
      this.getVenueHeadt();
      this.getSwimmingPool();
      this.getCertificationFormula();
      this.getBuoyantApparatus();
      this.getMonitoringAids();
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
    let examplesList = this.data.examplesList;
    GetBusinesslicenseDemo({
      rnd: 1,
      sign: getSign(`rnd=1`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.map(arr => {
          examplesList[0].imglist.push(arr.img_url)
        })
        this.setData({
          examplesList
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
    let examplesList = this.data.examplesList;
    GetHighLevelPermit({
      rnd: 1,
      sign: getSign(`rnd=1`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.map(arr => {
          examplesList[1].imglist.push(arr.img_url)
        })
        this.setData({
          examplesList
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
    let examplesList = this.data.examplesList;
    GetSanitaryPermit({
      rnd: 1,
      sign: getSign(`rnd=1`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.map(arr => {
          examplesList[2].imglist.push(arr.img_url)
        })
        this.setData({
          examplesList
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
    let examplesList = this.data.examplesList;
    GetVenueHeadt({
      rnd: 1,
      sign: getSign(`rnd=1`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.map(arr => {
          examplesList[3].imglist.push(arr.img_url)
        })
        this.setData({
          examplesList
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
    let examplesList = this.data.examplesList;
    GetSwimmingPool({
      rnd: 1,
      sign: getSign(`rnd=1`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.map(arr => {
          examplesList[4].imglist.push(arr.img_url)
        })
        this.setData({
          examplesList
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
    let examplesList = this.data.examplesList;
    GetCertificationFormula({
      rnd: 1,
      sign: getSign(`rnd=1`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.map(arr => {
          examplesList[5].imglist.push(arr.img_url)
        })
        this.setData({
          examplesList
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
    let examplesList = this.data.examplesList;
    GetBuoyantApparatus({
      rnd: 1,
      sign: getSign(`rnd=1`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.map(arr => {
          examplesList[6].imglist.push(arr.img_url)
        })
        this.setData({
          examplesList
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
    let examplesList = this.data.examplesList;
    GetMonitoringAids({
      rnd: 1,
      sign: getSign(`rnd=1`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.map(arr => {
          examplesList[7].imglist.push(arr.img_url)
        })
        this.setData({
          examplesList
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
    highlevelpermit_time = highlevelpermit_time.replace(/(\d{4})\-(\d{2})\-(\d{2})/, "$1/$2/$3") + ' 00:00';
    highlevelpermit_time = new Date(highlevelpermit_time).getTime();
    console.log(highlevelpermit_time);
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
  //我的场馆信息
  getVenuesDetail(){
    let that = this,venues_id = that.data.venues_id,user_id = app.globalData.user_id;
    GetVenuesDetail({
      venues_id :venues_id,
      user_id : user_id,
      sign : getSign(`venues_id=${venues_id}&user_id=${user_id}`)
    }).then(res=>{
      if (res.data.ErrCode == 0) {
        console.log(res);
        that.setData({
          venues_name: res.data.Response.venues_name,
          venues_another_name :res.data.Response.venues_another_name,
          address :res.data.Response.address,
          tel :res.data.Response. tel,
          head_name:res.data.Response.head_name,
          head_mobile :res.data.Response.head_mobile,
          business_license :res.data.Response.business_license.map(arr=>{return arr.img_url}),
          high_risk_permit :res.data.Response.high_risk_permit.map(arr=>{return arr.img_url}),
          highlevelpermit_time: res.data.Response.highlevelpermit_time,
          sanitary_permit: res.data.Response.sanitary_permit.map(arr=>{return arr.img_url}),
          venue_head:res.data.Response.venue_head.map(arr=>{return arr.img_url}),
          swimming_pool: res.data.Response.swimming_pool.map(arr=>{return arr.img_url}),
          certificate_formula :res.data.Response.certificate_formula.map(arr=>{return arr.img_url}),
          buoyant_apparatus :res.data.Response.buoyant_apparatus.map(arr=>{return arr.img_url}),
          monitoring_aids :res.data.Response. monitoring_aids.map(arr=>{return arr.img_url}),
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  },



  //文件上传
  postUploadFile(arr) {
    let that = this;
    let imgArr = that.data[that.data.model];
    console.log(that.data.model)
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
            if(imgArr.length<4){
              imgArr.push(p.Response);
            }
            console.log("imgArr", imgArr);
            that.setData({
              [that.data.model] : imgArr
            })
            console.log(that.data);
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