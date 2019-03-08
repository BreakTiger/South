import modals from '../../class/methods/modal.js'
const request = require('../../class/api/htts.js')

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lunbo: [
      '/image/banner/banner1.png',
      '/image/banner/banner2.png',
    ],
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
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this





  },

  // 轮播接口
  lunbo:function(){
    let that = this
    
  },

  // switchNotice: function() {
  //   let that = that
  //   wx.switchTab({
  //     url: '/pages/information/information',
  //   })
  // },


  // 进入通知详情
  toNotice: function() {
    wx.navigateTo({
      url: '/pages/information/notice/notice',
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