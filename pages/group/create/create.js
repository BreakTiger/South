import modals from '../../../class/methods/modal.js'
const request = require('../../../class/api/htts.js')
var app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this

    // 获取token
    let token = wx.getStorageSync('token')

    let data = {}

    let url = app.globalData.api + '/index.php/app/nkdyiban/getYibanAddGroup'

    request.sendRequest(url,'post',data,{
      'token':token
    }).then(function(res){
      console.log(res);
    })


  },

  // 带参跳转
  toTopic: function() {
    wx.navigateTo({
      url: '/pages/group/topic/topic',
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