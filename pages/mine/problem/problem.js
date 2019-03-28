import modal from '../../../class/methods/modal.js'
const request = require('../../../class/api/htts.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    prolist: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    // 获取token
    let token = wx.getStorageSync('token')
    // console.log(token);
    let data = {}
    let url = app.globalData.api + '/index.php/App/User/feedback_type'
    modal.loading();
    request.sendRequest(url, 'post', data, {
      "token": token
    }).then(function(res) {
      modal.loaded();
      //  console.log(res);
      let status = res.data.status
      let list = res.data.data
      // console.log(list);
      if (status == 200) {
        that.setData({
          prolist: list
        })
      }
    })
  },

  // 带参跳转
  toUpproblem: function(e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let list = that.data.prolist
    let item = list[index]
    console.log(item);
    let id = item.id
    let feedbackname = item.feedbackname
    let url = '/pages/mine/problem-detail/problem-detail?id='
    wx.navigateTo({
      url: '/pages/mine/problem-detail/problem-detail?id=' + id + '&feedbackname=' + feedbackname,
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