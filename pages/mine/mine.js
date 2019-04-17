import modal from '../../class/methods/modal.js'
const request = require('../../class/api/htts.js')
var app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },


  // 反馈跳转
  toproblem: function() {
    let url = '/pages/mine/problem/problem';
    modal.navigate(url);
  },

  tologinOut: function() {
    let that = this
    let session_key = wx.getStorageSync('session_key')
    let data = {
      session_key: session_key
    }
    let url = app.globalData.api + '/index.php/app/nkdyiban/yibanlogout';
    request.sendRequest(url, 'get', data, {
      "Content-Type": "application/x-www-form-urlencoded"
    }).then(function(res) {
      console.log(res);
      let status = res.data.status
      if(status==200){
        wx.navigateTo({
          url: '/pages/login/outlook/outlook',
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
    let that = this
    // 获取用户信息
    modal.loading();
    let user = wx.getStorageSync('userinfo');
    console.log('user:', user);
    that.setData({
      user: user
    })
    modal.loaded();
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