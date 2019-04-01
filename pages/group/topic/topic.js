import modal from '../../../class/methods/modal.js'
const request = require('../../../class/api/htts.js')
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupId: '',
    topiclist: [],
    page: 1,
    count: 15,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    let groupId = options.id
    console.log('groupId:', groupId)
    that.setData({
      groupId: groupId
    })

    that.gruopTopice()
  },

  gruopTopice: function() {
    let that = this
    let num =  that.data.page
    let page = parseInt(num)
    let session_key = wx.getStorageSync('session_key')
    let id = that.data.groupId
    let data = {
      session_key: session_key,
      group_id: id,
      page: page,
      count: 15
    }
    let url = app.globalData.api + '/index.php/app/nkdyiban/getYibanGroupTopic'
    modal.loading()
    request.sendRequest(url, 'post', data, {
      "Content-Type": "application/x-www-form-urlencoded"
    }).then(function(res) {
      modal.loaded()
      console.log(res)
      let status = res.data.status
      console.log(status)
      if (status == 200) {
        let list = res.data.data.info.list
        that.setData({
          topiclist: list
        })
      } else if (status == 201) {
        setTimeout(function () {
          wx.showToast({
            title: '网络请求失败，请稍后重试',
            icon: 'none'
          })
        }, 1000)
      }
    })

  },

  // 带参跳转
  toTopic: function(e) {
    let that = this
    let tid = e.currentTarget.dataset.id
    let gid = that.data.groupId
    console.log('tid:', tid);
    console.log('gid：', gid);
    wx.navigateTo({
      url: '/pages/group/topic-detail/topic-detail?tid=' + tid + "&gid=" + gid,
    })

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