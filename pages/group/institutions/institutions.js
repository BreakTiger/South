import modals from '../../../class/methods/modal.js'
const request = require('../../../class/api/htts.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    grouplist: [],
    page:1,
    pageTottomText:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    that.insit()
  },

  insit:function(){
    let that = this
    let session_key = wx.getStorageSync('session_key')
    let page = that.data.page
    let data = {
      session_key: session_key,
      page: page,
      count: 15
    }
    let url = app.globalData.api + '/index.php/app/nkdyiban/getYibanAddOrgan';
    modals.loading()
    request.sendRequest(url, 'post', data, {
      "Content-Type": "application/x-www-form-urlencoded"
    }).then(function (res) {
      modals.loaded()
      console.log(res)
      let status = res.data.status
      if (status == 200) {
        let list = res.data.data.info.organ_group
        that.setData({
          grouplist: list
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

  toTopic: function(e) {
    let id = e.currentTarget.dataset.id
    let url = '/pages/group/topic/topic?id='
    modals.navigate(url, id);
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000);
    this.insit()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let that = this

    let list = that.data.grouplist
    console.log(list)
    // 开始提示加载
    that.setData({
      pageTottomText: app.globalData.addText
    })
    let session_key = wx.getStorageSync('session_key')
    let page = that.data.page+1
    let data = {
      session_key: session_key,
      page: page,
      count: 15
    }
    console.log(data)
    let url = app.globalData.api + '/index.php/app/nkdyiban/getYibanAddOrgan';
    modals.loading()
    request.sendRequest(url,'post',data,{
      "Content-Type": "application/x-www-form-urlencoded"
    }).then(function(res){
      modals.loaded()
      console.log(res)
      let status = res.data.status
      if (status==200){
        let result = res.data.data.info.organ_group
        if (result.length!=0){
          that.setData({
            page: page
          })
          console.log(that.data.page);
          setTimeout(function () {
            let add = list.concat(result);
            that.setData({
              grouplist: add
            })
          }, 1000)
          console.log('333:', that.data.page)
          modals.loaded()
        }else{
          that.setData({
            pageTottomText: app.globalData.endText,
          })
          modals.loaded()
          console.log('444:', that.data.page)
        }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})