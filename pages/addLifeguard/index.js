// pages/addLifeguard/index.js
import {
  GetLifeguardImg,
  GetLifeguardDetail,
  PostLifeguard,
  getSign
} from './../../utils/axios.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    lifeguard_id: '',
    name: '',
    position: '',
    number: '',
    mobile: '',
    age: '',
    education: '',
    sex: true,
    is_as : true,
    LifeguardImg: [],
    examplesList: {
      flag: false,
      imglist: []
    }
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
  //示例
  examples(e) {
    let that = this;
    let examplesList = that.data.examplesList;
    examplesList.flag = !examplesList.flag;
    that.setData({
      examplesList
    })
  },
  //文件上传
  fileUpload(e) {
    let that = this;
    that.data.model = e.currentTarget.dataset.model
    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
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
    console.log([item], this.data)
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
  //单选
  radio(e){
    let that = this;
    let model = e.currentTarget.dataset.model
    that.setData({
      [model] : ! that.data[model]
    })
  },
  //撤销
  undo() {
    let that = this;
    console.log('撤销');
  },
  //提交 
  submit() {
    let that = this,data = that.data;
    if(!data.name){
      wx.showToast({
        title: '请输入救生员姓名 !',
        icon :'none'
      })
      return false
    }
    if(!data.position){
      wx.showToast({
        title: '请输入救生员岗位职务 !',
        icon :'none'
      })
      return false
    }
    if(!data.number){
      wx.showToast({
        title: '请输入救生员证件号 !',
        icon :'none'
      })
      return false
    }
    if(!data.mobile){
      wx.showToast({
        title: '请输入救生员联系方式 !',
        icon :'none'
      })
      return false
    }
    if(!data.age){
      wx.showToast({
        title: '请输入救生员年龄 !',
        icon :'none'
      })
      return false
    }
    if(!data.education){
      wx.showToast({
        title: '请输入救生员学历 !',
        icon :'none'
      })
      return false
    }
    if(data.LifeguardImg.length<1){
      wx.showToast({
        title: '请上传救生员上岗证照片 !',
        icon :'none'
      })
      return false
    }
    that.postLifeguard(res=>{
      console.log('提交成功');
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options) {
      this.setData({
        type: options.type,
        lifeguard_id: options.type ? options.type : 0,
      })
      this.getLifeguardImg()
    }

    if (options.type == 1) {
      // this.
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
  //救生员示例 
  getLifeguardImg() {
    let examplesList = this.data.examplesList;
    GetLifeguardImg({
      rnd: 1,
      sign: getSign(`rnd=1`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.map(arr => {
          examplesList.imglist.push(arr.img_url)
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
  //救生员详情
  getLifeguardDetail() {
    let lifeguard_id = this.data.lifeguard_id,
      user_id = wx.getStorageSync('user_id'),
      venues_id = wx.getStorageSync('venues_id');
    GetLifeguardDetail({
      user_id: user_id,
      venues_id: venues_id,
      lifeguard_id: lifeguard_id,
      sign: getSign(`user_id=${user_id}&venues_id=${venues_id}&lifeguard_id=${lifeguard_id}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);

      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  },
  //添加/修改救生员
  postLifeguard(callback) {
    let venues_id = wx.getStorageSync('venues_id')?wx.getStorageSync('venues_id'):1,
      user_id = wx.getStorageSync('user_id')?wx.getStorageSync('user_id') :2,
      { lifeguard_id, name, position, number, mobile, is_as, age, education, sex, LifeguardImg } = this.data;
    let datas = ['user_id=' + user_id + '&sign=' + getSign(`user_id=${user_id}`)];
    PostLifeguard({
      body: {
        venues_id: venues_id,
        lifeguard_id: lifeguard_id?lifeguard_id :0,
        name: name,
        position: position,
        number: number,
        mobile: mobile,
        is_as: is_as?0:1,
        age: age,
        education: education,
        sex: sex?0:1,
        imgurl: LifeguardImg
      }
    }, datas).then(res => {
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
            // console.log('model',that.data[that.data.model])
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