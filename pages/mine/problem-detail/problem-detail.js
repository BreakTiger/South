import modals from '../../../class/methods/modal.js'
const request = require('../../../class/api/htts.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeid: '', //故障类型ID
    current: 0, //初始字数
    max: 200, //最大字数
    inpuVal: '', //输入的内容
    imglist: [], //图片组
    imgmax: 4, //上传最多张数
    contact: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    console.log(options);
    // 获取类型ID
    let typeid = options.id
    that.setData({
      typeid: typeid
    })

  },

  // 字数限制
  limit: function(e) {
    let that = this
    // 获取输入的内容
    var value = e.detail.value;
    console.log(value);

    // 计算输入内容的长度
    var length = parseInt(value.length);
    console.log(length);
    if (length > this.data.max) {
      return;
    } else {
      this.setData({
        current: length,
        inpuVal: value
      });
    }
  },

  // 添加图片
  addpicture: function() {
    let that = this
    var imgbox = that.data.imglist;
    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        // console.log(res);
        var tempFilePaths = res.tempFilePaths;

        if (imgbox.length == 0) {
          imgbox = tempFilePaths
        } else if (4 > imgbox.length) {
          imgbox = imgbox.concat(tempFilePaths);
        }
        that.setData({
          imglist: imgbox.slice(0, 4)
        });
      }
    })

  },


  // 删除图片
  toDelet: function(e) {
    let that = this
    console.log(e);
    var index = e.currentTarget.dataset.index
    console.log('图片下标：', index);
    // 获取储存图片的数组
    var list = that.data.imglist;
    list.splice(index, 1)
    that.setData({
      imglist: list
    })
  },

  // 联系方式
  forContact: function(e) {
    let that = this
    let contact = e.detail.value
    console.log('contact:', contact);
    that.setData({
      contact: contact
    })
  },

  // 提交
  upData: function() {
    let that = this



    // // 获取数据
    // let token = wx.getStorageSync('token')
    // console.log('token:', token)

    // let input = that.data.inpuVal
    // console.log('输入的内容：', input)

    // let image = that.data.imglist
    // console.log('图片组：', image)

    // //选填
    // let contact = that.data.contact
    // console.log('联系方式：', contact)

    // let data = {}

    // if (contact!=''){

    // }else{
    //   data = {
    //     telephone:contact,

    //   }
    // }



  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})