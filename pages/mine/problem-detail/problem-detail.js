import modals from '../../../class/methods/modal.js'
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
    // 获取需要的数据
    var list = that.data.imglist;
    var maxs = that.data.imgmax;
    console.log('已经上传张数：', list.length);
    console.log('最大允许的上传张数', maxs);

    if (list.length == maxs){

    }else{
      wx.chooseImage({
        count:4,
        sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
        sourceType: ['album', 'camera'], 
        success: function(res) {
          console.log(res);
        },
      })
    }

    





   
  },

  // 删除图片
  toDelet: function(e) {
    let that = this
    // 获取当前要删除的图片的下标


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