import modals from '../../class/methods/modal.js'
const request = require('../../class/api/htts.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    winHeight: '',
    classlist: [],
    noticelist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this

    that.classinfo()

  },

  // 易班资讯
  classinfo: function() {
    let that = this


    let session_key = wx.getStorageSync('session_key')
    let data = {
      session_key: session_key
    }
    let url = app.globalData.api + '/index.php/app/nkdyiban/getYibanInfolist'
    modals.loading()
    request.sendRequest(url, 'post', data, {
      "Content-Type": "application/x-www-form-urlencoded"
    }).then(function(res) {
      modals.loaded()
      console.log(res);
      let status = res.data.status
      console.log(status)
      let list = res.data.data
      console.log(list)
      if (status == 200) {
        that.setData({
          classlist: list
        })
      } else if (status == 201) {
        // setInterval(function(){
        //   wx.showToast({
        //     title: '请求失败，请检查网络',
        //     icon: 'none'
        //   })
        // },500)
      } else if (status == 202) {

        // setInterval(function() {
        //   wx.showToast({
        //     title: '微信登陆失效，请重新登陆',
        //     icon:'none'
        //   })
        // }, 1000)
        // wx.reLaunch({
        //   url: '/pages/login/login',
        //   icon: 'none'
        // })

      } else {
        // setInterval(function () {
        //   wx.showToast({
        //     title: '易班登陆失效，请重新登陆',
        //     icon: 'none'
        //   })
        // }, 1000)
        // wx.reLaunch({
        //   url: '/pages/login/login',
        // })

      }
    })
  },

  // 通知公告
  noticeinfo: function() {
    let that = this

    let token = wx.getStorageSync('token')
    let data = {}
    let url = app.globalData.api + '/index.php/app/information/messageAll'
    modals.loading()
    request.sendRequest(url, 'post', data, {
      "token": token
    }).then(function(res) {
      modals.loaded()
      console.log(res)
      let status = res.data.status
      let list = res.data.data
      console.log(list)
      if (status == 200) {
        that.setData({
          noticelist: list
        })
      }
    })


  },




  // 点击切换
  selectType: function(e) {
    let that = this
    // console.log(e);
    // 获取点击的type的current
    var s_current = e.currentTarget.dataset.current
    // console.log('点击的:', s_current);
    // 获取当前的current
    var n_current = that.data.currentTab
    // console.log('当前的', n_current);
    if (n_current == s_current) {
      return false;
    } else { //切换
      that.setData({
        currentTab: s_current
      })
    }

  },



  // 滑动切换
  sChange: function(e) {
    let that = this
    // 获取滑块current
    var current = e.detail.current
    console.log('滑块current:', current);
    that.setData({
      currentTab: current
    })

    let tab = that.data.currentTab
    console.log('tab:', tab)
    if (tab == 1) {
      that.noticeinfo()
    } else if (tab == 0) {
      that.classinfo()
    }

  },



  toClass: function(e) {
    let src = e.currentTarget.dataset.src
    let url = '/pages/information/classinfo/classinfo?src=';
    modals.navigate(url, src)
  },

  toNotice: function(e) {

    let mid = e.currentTarget.dataset.id
    let url = '/pages/information/notice/notice?mid=';
    modals.navigate(url, mid);


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