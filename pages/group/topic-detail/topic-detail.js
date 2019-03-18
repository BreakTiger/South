import modal from '../../../class/methods/modal.js'
const request = require('../../../class/api/htts.js')
const WxParse = require('../../../wxParse/wxParse.js')

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tid: '',
    gid: '',
    infolist: '',
    commentslist: [],
    wind: false,
    type: '',
    value: '',
    val:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    let tid = options.tid
    let gid = options.gid
    that.setData({
      tid: tid,
      gid: gid
    })
    let session_key = wx.getStorageSync('session_key')
    let data = {
      session_key: session_key,
      topic_id: tid,
      group_id: gid
    }
    let url = app.globalData.api + '/index.php/app/nkdyiban/getYibanTopic';
    modal.loading()
    request.sendRequest(url, 'post', data, {
      "Content-Type": "application/x-www-form-urlencoded"
    }).then(function(res) {
      modal.loaded()
      // console.log(res)
      let status = res.data.status
      if (status == 200) {
        let info = res.data.data.info
        // console.log(info)
        that.setData({
          infolist: info 
        })
        let article = res.data.data.info.topic_content
        WxParse.wxParse('article', 'html', article, that, 5); //富文本解析
        that.comments();
      }

    })

  },

  comments: function() {
    let that = this
    let session_key = wx.getStorageSync('session_key')
    let tid = that.data.tid
    let gid = that.data.gid
    let data = {
      session_key: session_key,
      topic_id: tid,
      group_id: gid
    }
    let url = app.globalData.api + '/index.php/app/nkdyiban/getYibanTopicComment';
    modal.loading()
    request.sendRequest(url, 'post', data, {
      "Content-Type": "application/x-www-form-urlencoded"
    }).then(function(res) {
      modal.loaded()
      // console.log(res)
      let status = res.data.status
      if (status == 200) {
        let list = res.data.data.info.list
        console.log(list)
        that.setData({
          commentslist: list
        })
      }
    })
  },

  // 当前的用户（自己）发布评论
  myTalk: function() {
    // let that = this
    this.setData({
      wind: true,
      type: 1
    })
    console.log('11111')

  },

  // 评论其他人
  toTalk: function() {
    console.log('2222')
    this.setData({
      wind: true,
      type: 2
    })
  },


  // 关闭遮罩
  closeWind: function() {
    this.setData({
      wind: false
    })
  },

  // 获取输入的评价内容
  toVal: function(e) {
    let val = e.detail.value
    this.setData({
      val:val
    })
  },

  // 发布
  toSand:function(){
    let that = this
    

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