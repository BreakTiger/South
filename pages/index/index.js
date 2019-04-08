import modals from '../../class/methods/modal.js'
const request = require('../../class/api/htts.js')
var app = getApp()

Page({


  data: {
    lunbo: [],
    navlist: [{
        icon: '/image/nav/icon1.png',
        nav: '综合测评',
        src: 'https://cas.sustech.edu.cn/cas/login?service=https://student-wechat.sustech.edu.cn/?param=evaluation'
      },
      // {
      //   icon: '/image/nav/icon2.png',
      //   nav: '成绩查询',
      //   src: ''
      // },
      {
        icon: '/image/nav/icon3.png',
        nav: '课表查询',
        src: 'https://cas.sustech.edu.cn/cas/login?service=https://student-wechat.sustech.edu.cn/?param=SignUpClassList'
      }, {
        icon: '/image/nav/icon4.png',
        nav: '就业管理',
        src: 'https://cas.sustech.edu.cn/cas/login?service=https://student-wechat.sustech.edu.cn/?param=gradu1ate-employ'
      }, {
        icon: '/image/nav/icon5.png',
        nav: '物业报修',
        src: 'http://x.pai-xiu.com:9099/index.html%20?openId=18102775413&sign=icZunIMRGV7v+4OT/dW7H7ExceFAVHOOPli/SxpV+vrtgNMc2IOKKc+Jntfzc0zzuS1jeHQsk2p7lUT38FzcPo6TkjYbN865fXqg4Hy4J/pEL9+PDdWz4twflXc/RO7HwzU8zzhEI6327GvGN7uZiq0yq21nFRQYVk+Xj3G6KWc=#/'
      }, {
        icon: '/image/nav/icon6.png',
        nav: '请假管理',
        src: 'http://ehall.sustech.edu.cn/xhxsfw/sys/qjgl/*default/index.html'
      }, {
        icon: '/image/nav/icon7.png',
        nav: '选课',
        src: 'https://cas.sustech.edu.cn/cas/login?service=https://student-wechat.sustech.edu.cn/?param=course-selection'
      }
    ],
    notice: [],
    page: 1,
    count: 15,
    pageTottomText: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    that.lunbo()
  },

  //首页轮播
  lunbo: function() {
    let that = this
    let data = {}
    let url = app.globalData.api + '/index.php/app/banner/banner';
    modals.loading()
    request.sendRequest(url, 'post', data, {
      "Content-Type": "application/x-www-form-urlencoded"
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
    let page = that.data.page
    let count = that.data.count
    let data = {
      page: page,
      count: count
    }
    console.log('data:', data);
    let url = app.globalData.api + '/index.php/app/information/messagePush';
    modals.loading()
    request.sendRequest(url, 'post', data, {
      "token": token
    }).then(function(res) {
      modals.loaded()
      let status = res.data.status
      if (status == 200) {
        let notice = res.data.data
        console.log(notice)
        that.setData({
          notice: notice
        })
        console.log(that.data.page)
      }
    })
  },

  toImage: function(e) {
    let src = e.currentTarget.dataset.src
    console.log(src)
    let url = '/pages/index/bannerlink/bannerlink?src='
    modals.navigate(url, src);
  },

  // 外部跳转
  selectKinds: function(e) {
    // let src = e.currentTarget.dataset.src
    // console.log(src)
    // let url = encodeURIComponent(JSON.stringify(src));
    // console.log(url)
    // wx.navigateTo({
    //   url: '/pages/index/outNet/outNet?url=' + url,
    // })

    wx.navigateTo({
      url: '/pages/index/outNet/outNet',
    })
  },

  // 进入通知详情
  toNotice: function(e) {
    let mid = e.currentTarget.dataset.id
    let url = '/pages/information/notice/notice?mid=';
    modals.navigate(url, mid);
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
    this.lunbo()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let that = this
    let token = wx.getStorageSync('token')
    let page = that.data.page + 1
    let count = that.data.count
    // 获取之前获取的数据
    let list = that.data.notice
    console.log('已经获取的数据：', list);
    // 开始提示加载
    that.setData({
      pageTottomText: app.globalData.addText
    })
    let data = {
      page: page,
      count: count
    }
    console.log(data)
    let url = app.globalData.api + '/index.php/app/information/messagePush';
    modals.loading()
    request.sendRequest(url, 'post', data, {
      "token": token
    }).then(function(res) {
      console.log('555:', res)
      let status = res.data.status
      if (status == 200) {
        let result = res.data.data
        console.log(result)
        if (result.length != 0) {
          that.setData({
            page: page
          })
          console.log(that.data.page);
          setTimeout(function() {
            let add = list.concat(result);
            that.setData({
              notice: add
            })
          }, 1000)
          console.log('333:', that.data.page)
          modals.loaded()
        } else {
          that.setData({
            pageTottomText: app.globalData.endText,
          })
          modals.loaded()
          console.log('444:', that.data.page)
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})