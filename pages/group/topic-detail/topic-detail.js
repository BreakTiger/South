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
    cid: '',
    infolist: '',
    commentslist: [],
    wind: false,
    type: '',
    value: '',
    val: '',
    showMore: 0,
    show: "",
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

  // 评论列表
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
        // console.log(list)
        var atr = []
        for (var i = 0; i < list.length; i++) {
          let item = list[i]
          item.show = '0' //给数组中每一个item增加一个变量
          // console.log(item)
          atr.push(item)
          // console.log('atr:', atr)
          that.setData({
            commentslist: atr
          })
        }
      }
    })
  },

  // 显示更多回复
  showMore: function(e) {
    let that = this
    console.log(e)

    let index = e.currentTarget.dataset.index
    console.log('index:',index);
    let cid = e.currentTarget.dataset.cid
    console.log('cid：',cid);
    let item = that.data.commentslist[index]
    console.log('item:',item)
    let comment_id = item.comment_id
    if (cid == comment_id){
      item.show = '1'
    }
    let change = that.data.commentslist 
    that.setData({
      commentslist: change
    })
  },


  // 当前的用户（自己）发布评论
  myTalk: function() {
    this.setData({
      wind: true,
      type: 1
    })
  },

  // 评论其他人
  toTalk: function(e) {
    let cid = e.currentTarget.dataset.id
    this.setData({
      wind: true,
      cid: cid,
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
      val: val
    })
  },

  // 发布
  toSand: function(e) {
    let that = this
    // 通过type来判断使用哪一种发布的方法
    let type = that.data.type
    let session_key = wx.getStorageSync('session_key');
    let tid = that.data.tid
    let gid = that.data.gid
    let input = that.data.val
    console.log('输入：', input);
    if (input == "") {
      wx.showToast({
        title: '请输入您的评论内容',
        icon: 'none'
      })
    } else {
      if (type == 1) { //自己发布评论
        let data = {
          session_key: session_key,
          topic_id: tid,
          group_id: gid,
          comment_content: input
        }
        console.log('data:', data)
        let url = app.globalData.api + '/index.php/app/nkdyiban/getYibanTopicReply'
        modal.loading()
        request.sendRequest(url, 'post', data, {
          "Content-Type": "application/x-www-form-urlencoded"
        }).then(function(res) {
          let status = res.data.status
          if (status == 200) {
            that.setData({
              val: '',
              wind: false
            })
            that.onPullDownRefresh();
            modal.loaded();
          }
        })
      } else if (type == 2) { //评论别人发布的评论
        let cid = that.data.cid
        let data = {
          session_key: session_key,
          topic_id: tid,
          group_id: gid,
          comment_content: input,
          comment_id: cid
        }
        console.log('data:', data);
        let url = app.globalData.api + '/index.php/app/nkdyiban/getYibanTopicReply'
        modal.loading()
        request.sendRequest(url, 'post', data, {
          "Content-Type": "application/x-www-form-urlencoded"
        }).then(function(res) {
          console.log(res)
          let status = res.data.status
          if (status == 200) {
            that.setData({
              val: '',
              wind: false
            })
            that.onPullDownRefresh();
            modal.loaded();
          }
        })


      }
    }
  },

  // 删除当前用户自己发布的评论
  toDel: function(e) {
    let that = this
    let session_key = wx.getStorageSync('session_key');
    let tid = that.data.tid
    let gid = that.data.gid
    let cid = e.currentTarget.dataset.id
    let data = {
      session_key: session_key,
      topic_id: tid,
      group_id: gid,
      comment_id: cid
    }
    console.log(data);
    let url = app.globalData.api + '/index.php/app/nkdyiban/getYibanTopicDelete'
    modal.loading()
    request.sendRequest(url, 'get', data, {}).then(function(res) {
      let status = res.data.status
      if (status == 200) {
        that.onPullDownRefresh();
        modal.loaded()
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
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000);
    this.comments()

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