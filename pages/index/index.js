import modals from '../../class/methods/modal.js'
const request = require('../../class/api/htts.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lunbo: [],
    navlist: [{
      icon: '/image/nav/icon1.png',
      nav: '综合测评'
    }, {
      icon: '/image/nav/icon2.png',
      nav: '成绩查询'
    }, {
      icon: '/image/nav/icon3.png',
      nav: '课表查询'
    }, {
      icon: '/image/nav/icon4.png',
      nav: '就业管理'
    }, {
      icon: '/image/nav/icon5.png',
      nav: '物业报修'
    }, {
      icon: '/image/nav/icon6.png',
      nav: '请假管理'
    }, {
      icon: '/image/nav/icon7.png',
      nav: '选课'
    }],
    notice: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this

    let token = wx.getStorageSync('token')
    console.log('token:', token);
    let data = {}
    let url = app.globalData.api + '/index.php/app/banner/banner'
    modals.loading()
    request.sendRequest(url, 'post', data, {
      "token": token
    }).then(function(res) {
      modals.loaded()
      console.log(res)
      let status = res.data.status
      if (status == 200) {
        that.setData({
          lunbo: res.data.data
        })
        that.announcements()
      }
    })
  },

  // 通知公告
  announcements: function() {
    let that = this
    let token = wx.getStorageSync('token')
    let data = {}
    let url = app.globalData.api + '/index.php/app/information/messagePush'
    request.sendRequest(url, 'post', data, {
      'token': token
    }).then(function(res) {
      // console.log(res)
      let notice = res.data.data
      let status = res.data.status
      if (status == 200) {
        that.setData({
          notice: notice
        })
      }
    })
  },


  // 进入通知详情
  toNotice: function(e) {
    let mid = e.currentTarget.dataset.id
    let url = '/pages/information/notice/notice?mid=';
    modals.navigate(url,mid);
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
    // 判断用户是否登陆过

    // 没登陆则缓存中不存在token

    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
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