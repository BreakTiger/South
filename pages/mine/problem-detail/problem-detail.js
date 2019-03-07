// pages/mine/problem-detail/problem-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    max: 20,
    imglist: [],
    imgmax: 4
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

  // 添加图片
  addpicture: function() {
    let that = this
    var imgbox = that.data.imglist;

    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log(res);
        var tempFilePaths = res.tempFilePaths;
        
        if (imgbox.length == 0) {
          imgbox = tempFilePaths
        } else if (4 > imgbox.length) {
          imgbox = imgbox.concat(tempFilePaths);
        } else {
          imgbox[picid] = tempFilePaths[0];
        }
        that.setData({
          imglist: imgbox
        });

      },
    })

  },

  // 删除图片
  toDelet: function(e) {
    let that = this
    console.log(e);
    var index = e.currentTarget.dataset.index
    console.log('图片下标：',index);
    // 获取储存图片的数组
    var list = that.data.imglist;
    list.splice(index,1)
    that.setData({
      imglist:list
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