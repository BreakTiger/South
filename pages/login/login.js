import modals from '../../class/methods/modal.js'
const request = require('../../class/api/htts.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    key: '',
    type: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    // 获取session_key
    let codes = wx.getStorageSync('code')
    console.log(codes)
    let data = {
      code: codes
    }
    let url = app.globalData.api + "/index.php/App/App/xcxOpenid"
    modals.loading();
    request.sendRequest(url, 'post', data, {
      "Content-Type": "application/x-www-form-urlencoded"
    }).then(function(res) {
      modals.loaded();
      console.log(res)
      let skey = res.data.data
      let status = res.data.status
      if (status == 200) {
        that.setData({
          key: res.data.data
        })
      }
    })
  },



  // 用户确定授权
  confirm: function(e) {
    let that = this
    let keys = that.data.key;
    console.log('key:', keys)
    let type = that.data.type
    console.log('type:', type);
    console.log(e);
    let encryptedData = e.detail.encryptedData
    let iv = e.detail.iv
    console.log('encryptedData:', encryptedData);
    console.log('iv:', iv);
    let data = {
      type: type,
      session_key: keys,
      encryptedData: encryptedData,
      iv: iv
    }
    let url = app.globalData.api + '/index.php/App/App/login'
    modals.loading();
    request.sendRequest(url, 'post', data, {
      "Content-Type": "application/x-www-form-urlencoded"
    }).then(function(res) {
      modals.loaded()
      console.log(res)
      let status = res.data.status
      if (status == 200) {
        let token = res.data.data.token
        console.log('token:', token);
        // 设置为缓存
        wx.setStorageSync('token', token);


        that.location();
        // wx.reLaunch({
        //   url: '/pages/index/index',
        // })
      }
    })
  },

  // 定位方法
  location: function() {

    let that = this

    wx.showModal({
      title: '请求授权当前位置',
      content: '需要获取您的地理位置，请确认授权',
      success: function(res) {
        if (res.confirm) {

          // console.log('1111');

          wx.getLocation({
            success: function(res) {
              console.log(res)
            },
          })


        } else if (res.cancel) {
          console.log('2222');
        }
      },
    })

    console.log('获取地址');
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
    // 判断是否是第一次使用该小程序
    let that = this
    // 获取缓存中的token
    let token = wx.getStorageSync('token')
    console.log('token:', token);
    // 不为空时：
    if (token != '') {
      that.location();
      // wx.reLaunch({
      //   url: '/pages/index/index',
      // })
    }
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