import modals from '../../class/methods/modal.js';
const request = require('../../class/api/htts.js');
const app = getApp();


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
    let code = wx.getStorageSync('code');
    console.log('code:', code);
    let data = {
      code: code
    }
    let url = app.globalData.api + '/index.php/App/App/xcxOpenid';
    modals.loading()
    request.sendRequest(url, 'post', data, {
      "Content-Type": "application/x-www-form-urlencoded"
    }).then(function(res) {
      modals.loaded();
      console.log(res);
      let status = res.data.status
      if (status == 200) {
        let key = res.data.data
        that.setData({
          key: key
        })
        wx.setStorageSync('session_key', key);
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

    let userinfo = e.detail.userInfo
    console.log('userinfo:', userinfo);

    wx.setStorageSync('userinfo', userinfo);
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
      // console.log(res)
      let status = res.data.status
      if (status == 200) {
        let token = res.data.data.token
        // console.log('token:', token);
        // 设置为缓存
        wx.setStorageSync('token', token);
        wx.navigateTo({
          url: '/pages/login/outlook/outlook'
        })
       
      } else if (status == 201) {
        wx.showToast({
          title: '系统繁忙，请稍后重试',
          icon:'none'
        })
      }
    })
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