import { get, post, getSign } from './http.js';

/**公用接口 */
//获取分享信息
const GetShareInformation = data => {
  return get('api/Lib/GetShareInformation', data);
}
//手机短信发送
const GetSMSCode = data => {
  return get('api/Lib/GetSMSCode', data);
}
//Android版本更新
const GetVersionUpdate = data => {
  return get('api/Lib/GetVersionUpdate', data);
}
//文件上传
const PostUploadFile = (data, datas) => {
  return post('api/Lib/PostUploadFile', data, datas);
}
//base64图片上传
const PostUploadFileBase64 = (data, datas) => {
  return post('api/Lib/PostUploadFileBase64', data, datas);
}
//获取支付信息
const GetPayInfo = data => {
  return get('api/Lib/GetPayInfo', data);
}
//获取下载页面地址
const GetDownloadUrl = data => {
  return get('api/Lib/GetDownloadUrl', data);
}




/**系统设置 */
//营业执照片示例
const GetBusinesslicenseDemo = data => {
  return get('api/Sys/GetBusinesslicenseDemo', data);
}
//高位许可证照片示例
const GetHighLevelPermit = data => {
  return get('api/Sys/GetHighLevelPermit', data);
}
//卫生许可证照片示例
const GetSanitaryPermit = data => {
  return get('api/Sys/GetSanitaryPermit', data);
}
//场馆门头照片示例
const GetVenueHeadt = data => {
  return get('api/Sys/GetVenueHeadt', data);
}
//泳池照片示例
const GetSwimmingPool = data => {
  return get('api/Sys/GetSwimmingPool', data);
}
//证照公式照片示例
const GetCertificationFormula = data => {
  return get('api/Sys/GetCertificationFormula', data);
}
//救生器材照片示例
const GetBuoyantApparatus = data => {
  return get('api/Sys/GetBuoyantApparatus', data);
}
//监控设备照片示例
const GetMonitoringAids = data => {
  return get('api/Sys/GetMonitoringAids', data);
}
//救生员上岗证照片示例
const GetLifeguardImg = data => {
  return get('api/Sys/GetLifeguardImg', data);
}
//每日水质记录照片
const GetWaterQuality = data => {
  return get('api/Sys/GetWaterQuality', data);
}
//每日泳池现场照片示例
const GetEverySwimmingPool = data => {
  return get('api/Sys/GetEverySwimmingPool', data);
}
//救生员-提示
const GetLifeguardTip = data => {
  return get('api/Sys/GetLifeguardTip', data);
}
//上岗及水质信息-时间/提示
const GetTimeAndTip = data => {
  return get('api/Sys/GetTimeAndTip', data);
}
//场馆客流-提示
const GetPassengerTip = data => {
  return get('api/Sys/GetPassengerTip', data);
}



/**微信登录 */
//获得open_id
const Getopenid = data => {
  return get('api/WeiXin/Getopenid', data);
}

/**救生员信息 */
//救生员列表
const GetLifeguardList = data => {
  return get('api/Lifeguard/GetLifeguardList', data);
}
//添加/修改救生员
const PostLifeguard = (data, datas) => {
  return post('api/Lifeguard/PostLifeguard', data, datas);
}
//删除救生员
const GetDelLifeguard = data => {
  return get('api/Lifeguard/GetDelLifeguard', data);
}
//救生员详情
const GetLifeguardDetail = data => {
  return get('api/Lifeguard/GetLifeguardDetail', data);
}





/**场馆客流 */
//客流信息上传
const GetPassenger = data => {
  return get('api/Passenger/GetPassenger', data);
}
//场馆客流-列表
const GetPassagerList = data => {
  return get('api/Passenger/GetPassagerList', data);
}
//记录详情
const GetPassagerDetail = data => {
  return get('api/Passenger/GetPassagerDetail', data);
}


/**事故汇报 */
//添加/修改救生员
const PostAccidentList = (data, datas) => {
  return post('api/Accident/PostAccidentList', data, datas);
}


/**会员中心 */
//用户登录
const PostUserLogin = (data, datas) => {
  return post('api/UserBase/PostUserLogin', data, datas);
}
//解密
const Postdecryption = (data, datas) => {
  return post('api/UserBase/Postdecryption', data, datas);
}
//场馆注册/修改
const PostVenuesRegistered = (data, datas) => {
  return post('api/UserBase/PostVenuesRegistered', data, datas);
}
//账号密码登录
const GetLogin = data => {
  return get('api/UserBase/GetLogin', data);
}
//我的场馆信息
const GetVenuesDetail = data => {
  return get('api/UserBase/GetVenuesDetail', data);
}
//重要通知信息
const GetMyMessage = data => {
  return get('api/UserBase/GetMyMessage', data);
}
//信息详情
const GetMessageDetail = data => {
  return get('api/UserBase/GetMessageDetail', data);
}
//信息回复
const GetMessageReply = data => {
  return get('api/UserBase/GetMessageReply', data);
}



/**上岗及水质信息 */
//上岗及水质信息
const PostWaterQuality = (data, datas) => {
  return get('api/WaterQuality/PostWaterQuality', data, datas);
}
//往日上传记录
const GetWaterQualityList = data => {
  return get('api/WaterQuality/GetWaterQualityList', data);
}
//记录详情
const GetWaterQualityDetail = data => {
  return get('api/UserBase/GetWaterQualityDetail', data);
}






export {


  //公用接口
  getSign,
  GetShareInformation,
  GetSMSCode,
  GetVersionUpdate,
  PostUploadFile,
  PostUploadFileBase64,
  GetPayInfo,
  GetDownloadUrl,


  /**系统设置  */
  GetBusinesslicenseDemo,
  GetHighLevelPermit,
  GetSanitaryPermit,
  GetVenueHeadt,
  GetSwimmingPool,
  GetCertificationFormula,
  GetBuoyantApparatus,
  GetMonitoringAids,
  GetLifeguardImg,
  GetWaterQuality,
  GetEverySwimmingPool,
  GetLifeguardTip,
  GetTimeAndTip,
  GetPassengerTip,


  /**微信登录  */
  Getopenid,


  /**救生员信息 */
  GetLifeguardList,
  PostLifeguard,
  GetDelLifeguard,
  GetLifeguardDetail,

  

  /**场馆客流 */
  GetPassenger,
  GetPassagerList,
  GetPassagerDetail,


  /**事故汇报 */
  PostAccidentList,



  /**会员中心 */
  PostUserLogin,
  Postdecryption,
  PostVenuesRegistered,
  GetLogin,
  GetVenuesDetail,
  GetMyMessage,
  GetMessageDetail,
  GetMessageReply,


  /**上岗及水质信息 */
  PostWaterQuality,
  GetWaterQualityList,
  GetWaterQualityDetail,

}