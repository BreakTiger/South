Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 1,
    winHeight: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  // 点击切换
  selectType: function(e) {
    let that = this
    console.log(e);
    // 获取点击的type的current
    var s_current = e.currentTarget.dataset.current
    // console.log('点击的:', s_current);
    // 获取当前的current
    var n_current = that.data.currentTab
    // console.log('当前的', n_current);

    if (n_current == s_current) {
      return false;
    } else {
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
    that.setData({
      currentTab: current
    })
  },

  toClass: function() {
    wx.navigateTo({
      url: '/pages/information/classinfo/classinfo',
    })
  },

  toNotice: function() {
    wx.navigateTo({
      url: '/pages/information/notice/notice',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    let that = this
    //  高度自适应
    wx.getSystemInfo({
      success: function(res) {
        // console.log(res)
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc
        })
      },
    })
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