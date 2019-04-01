import modals from '../../../class/methods/modal.js'
const request = require('../../../class/api/htts.js')
var app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupList: [],
    page:1,
    count:15
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    let session_key = wx.getStorageSync('session_key')
    let page = that.data.page
    let data = {
      session_key: session_key,
      page: page,
      count:15
    }
    let url = app.globalData.api + '/index.php/app/nkdyiban/getYibanCreateGroup'
    modals.loading()
    request.sendRequest(url, 'post', data,{
      "Content-Type": "application/x-www-form-urlencoded"
    }).then(function(res) {
      modals.loaded()
      console.log(res)
      let status = res.data.status
      if(status==200){
        let group = res.data.data.info.group
        that.setData({
          groupList: group
        })
      } else if (status == 201) {
        setTimeout(function () {
          wx.showToast({
            title: '网络请求失败，请稍后重试',
            icon: 'none'
          })
        }, 1000)
      } else if (status == 202) {
        setTimeout(function () {
          wx.showToast({
            title: '登陆失效，请重新登陆',
            icon: 'none'
          })
        }, 1000)
        wx.reLaunch({
          url: '/pages/login/login',
        })
      } else if (status == 203) {
        setTimeout(function () {
          wx.showToast({
            title: '登陆失效，请重新登陆',
            icon: 'none'
          })
        }, 1000)
        wx.reLaunch({
          url: '/pages/login/login',
        })
      }
    })
  },

  // 带参跳转
  toTopic: function(e) {
    let id = e.currentTarget.dataset.id
    let url = '/pages/group/topic/topic?id='
    modals.navigate(url, id);
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