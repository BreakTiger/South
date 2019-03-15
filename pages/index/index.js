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
        nav: '综合测评',
        src: 'https://student-wechat.sustc.edu.cn/?ticket=ST-935222-3TonAzSqZwyHkq0Cwp2T-cas.sustc.edu.cn#/app/evaluation'
      },
      // {
      //   icon: '/image/nav/icon2.png',
      //   nav: '成绩查询',
      //   src: ''
      // },
      {
        icon: '/image/nav/icon3.png',
        nav: '课表查询',
        src: 'https://student-wechat.sustc.edu.cn/?ticket=ST-935222-3TonAzSqZwyHkq0Cwp2T-cas.sustc.edu.cn#/app/SignUpClassList'
      }, {
        icon: '/image/nav/icon4.png',
        nav: '就业管理',
        src: 'https://student-wechat.sustc.edu.cn/?ticket=ST-935222-3TonAzSqZwyHkq0Cwp2T-cas.sustc.edu.cn#/app/graduate-employ'
      }, {
        icon: '/image/nav/icon5.png',
        nav: '物业报修',
        src: 'http://x.pai-xiu.com:9099/index.html%20?openId=18102775413&sign=icZunIMRGV7v+4OT/dW7H7ExceFAVHOOPli/SxpV+vrtgNMc2IOKKc+Jntfzc0zzuS1jeHQsk2p7lUT38FzcPo6TkjYbN865fXqg4Hy4J/pEL9+PDdWz4twflXc/RO7HwzU8zzhEI6327GvGN7uZiq0yq21nFRQYVk+Xj3G6KWc=#/'
      }, {
        icon: '/image/nav/icon6.png',
        nav: '请假管理',
        src: 'http://ehall.sustc.edu.cn/xhxsfw/sys/qjgl/*default/index.html#/'
      }, {
        icon: '/image/nav/icon7.png',
        nav: '选课',
        src: 'https://student-wechat.sustc.edu.cn/?ticket=ST-935222-3TonAzSqZwyHkq0Cwp2T-cas.sustc.edu.cn#/app/course-selection'
      }
    ],
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
      
      console.log(res)
      let status = res.data.status
      if (status == 200) {
        that.setData({
          lunbo: res.data.data
        })
        modals.loaded()
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
    modals.loading()
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
        modals.loaded()
      }
    })
  },

  toImage: function(e) {
    let src = e.currentTarget.dataset.src
    console.log(src)
    let url = '/pages/index/outNet/outNet?src='
    modals.navigate(url, src);

  },

  selectKinds:function(e){
    let src = e.currentTarget.dataset.src
    console.log(src)
    let url = '/pages/index/outNet/outNet?src='
    modals.navigate(url, src);
  },


  // 进入通知详情
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