import modals from '../../../class/methods/modal.js'
const request = require('../../../class/api/htts.js')
const WxParse = require('../../../wxParse/wxParse.js')
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    information: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    console.log(options);
    let mid = options.mid
    let token = wx.getStorageSync('token')
    let data = {
      message_id: mid
    }
    let url = app.globalData.api + '/index.php/app/information/messageSee'
    modals.loading()
    request.sendRequest(url, 'post', data, {
      'token': token
    }).then(function(res) {
      modals.loaded()
      console.log(res)
      let status = res.data.status
      if(status==200){
        that.setData({
          information:res.data.data
        })
        let article = res.data.data.message
        WxParse.wxParse('article', 'html', article, that, 5);
        
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