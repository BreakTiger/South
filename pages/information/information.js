import modals from '../../class/methods/modal.js'
const request = require('../../class/api/htts.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    classlist: [],
    noticelist: [],
    page1: 1,
    page2: 1,
    count: 15,
    pageTottomText1: '',
    pageTottomText2: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    let tab = that.data.currentTab
    if (tab == 0) {
      that.classinfo()
    } else if (tab == 1) {
      that.noticeinfo()
    }
  },

  // 易班资讯
  classinfo: function() {
    let that = this
    let session_key = wx.getStorageSync('session_key')
    let page = that.data.page1
    let count = that.data.count
    let data = {
      session_key: session_key,
      page: page,
      count: count
    }
    console.log(data)
    let url = app.globalData.api + '/index.php/app/nkdyiban/getYibanInfolist'
    modals.loading()
    request.sendRequest(url, 'post', data, {
      "Content-Type": "application/x-www-form-urlencoded"
    }).then(function(res) {
      console.log(res);
      let status = res.data.status
      if (status == 200) {
        let list = res.data.data
        that.setData({
          classlist: list
        })
        modals.loaded()
      }
    })
  },

  // 通知公告
  noticeinfo: function() {
    let that = this
    let page = that.data.page2
    let count = that.data.count
    let token = wx.getStorageSync('token')
    let data = {
      page: page,
      count: count
    }
    console.log(data)
    let url = app.globalData.api + '/index.php/app/information/messageAll'
    modals.loading()
    request.sendRequest(url, 'post', data, {
      "token": token
    }).then(function(res) {
      console.log(res);
      let status = res.data.status
      if (status == 200) {
        let list = res.data.data
        that.setData({
          noticelist: list
        })
        modals.loaded()
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

  onPullDownRefresh: function() {
    let tab = this.data.currentTab
    if (tab == 0) {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 1000
      })
      setTimeout(() => {
        wx.stopPullDownRefresh()
      }, 1000);
      this.classinfo()
    } else if (tab == 1) {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 1000
      })
      setTimeout(() => {
        wx.stopPullDownRefresh()
      }, 1000);
      this.noticeinfo()
    }

  },

  toPage: function() {
    let that = this
    let tab = that.data.currentTab
    // 判断
    if (tab == 0) {
      let list = that.data.classlist
      console.log('已经获取：', list)

      that.setData({
        pageTottomText1: app.globalData.addText
      })

      let session_key = wx.getStorageSync('session_key')
      let page = that.data.page1
      page += 1;
      let count = that.data.count
      let data = {
        session_key: session_key,
        page: page,
        count: count
      }
      console.log(data)
      let url = app.globalData.api + '/index.php/app/nkdyiban/getYibanInfolist'
      modals.loading()
      request.sendRequest(url, 'post', data, {
        "Content-Type": "application/x-www-form-urlencoded"
      }).then(function(res) {
        console.log(res)
        let status = res.data.status
        if (status == 200) {
          let result = res.data.data
          console.log(result)
          if (result.length != 0) {
            that.setData({
              page1: page
            })
            setTimeout(function() {
              let add = list.concat(result);
              that.setData({
                classlist: add
              })
            }, 1000)
            modals.loaded()
          } else {
            that.setData({
              pageTottomText1: app.globalData.endText,
            })
            modals.loaded()
          }
        }
      })
    } else if (tab == 1) {
      that.setData({
        pageTottomText2: app.globalData.addText
      })
      let list = that.data.noticelist
      console.log('已经获取的数据：', list)
      let page = that.data.page2
      page += 1
      let count = that.data.count
      let token = wx.getStorageSync('token')
      let data = {
        page: page,
        count: count
      }
      console.log(data)
      let url = app.globalData.api + '/index.php/app/information/messageAll'
      modals.loading()
      request.sendRequest(url, 'post', data, {
        "token": token
      }).then(function(res) {
        console.log(res)
        let status = res.data.status
        if (status == 200) {
          let result = res.data.data
          console.log(result)
          if (result.length != 0) {
            that.setData({
              page2: page
            })
            setTimeout(function() {
              let add = list.concat(result);
              that.setData({
                noticelist: add
              })
            }, 1000)
            modals.loaded()
          } else {
            that.setData({
              pageTottomText2: app.globalData.endText,
            })
            modals.loaded()
          }
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
  
})