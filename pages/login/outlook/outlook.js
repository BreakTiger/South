// pages/login/outlook/outlook.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this

    let session_key = wx.getStorageSync('session_key')
    console.log('session_key:', session_key);
    let url = 'https://nankeda.heifeng.xin/index.php/app/nkdyiban/yibanlogin?session_key=' + session_key;
    console.log('url:', url);
    that.setData({
      url: url,
    })

  },

  togetData: function(e) {
    let that = this
    console.log('从网页中获取的信息：');
    console.log(e);

    wx.reLaunch({
      url: '/pages/index/index',
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // wx.navigateBack({
    //   url: '/pages/login/login'
    // })
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
    togetData

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    let that = this

    that.togetData()
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