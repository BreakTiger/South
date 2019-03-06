// pages/mine/problem-detail/problem-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    max: 20,
    imglist:[
      '/image/icon/small.png',
      '/image/icon/small.png',
      '/image/icon/small.png',
      '/image/icon/small.png'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  // 字数
  limit: function(e) {
    let that = this
    // 获取输入的内容
    var value = e.detail.value;
    console.log(value);
    // 计算长度
    var length = parseInt(value.length);
    console.log(length);

    if (length > this.data.max) {
      return;
    } else {
      this.setData({
        current: length
      });
    }
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