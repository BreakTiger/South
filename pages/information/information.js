Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    infor: [{
      img: '/image/info/info1.png',
      title: '宾夕法尼亚大学陈一伟教授南科大讲堂分享新型阻变存储材料的研究',
      reads: '45',
      date: '2018-9-1'
    }, {
      img: '/image/info/info2.png',
      title: '南科大举办著名高校物理系主任论坛',
      reads: '64',
      date: '2018-9-1'
    }, {
      img: '/image/info/info3.png',
      title: '南科大举办著名高校物理系主任论坛',
      reads: '11',
      date: '2018-9-1'
    }, {
      img: '/image/info/info4.png',
      title: '南科大化学系李闯创课题组',
      reads: '0',
      date: '2018-9-1'
    }, {
      img: '/image/info/info5.png',
      title: '深圳北理莫斯科大学代理校长唐水源来校访问',
      reads: '5',
      date: '2018-9-1'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;

    wx.getSystemInfo({

      success: function(res) {
        console.log(res)
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },

  /** 
   * 滑动切换tab 
   */
  bindChange: function(e) {

    var that = this;
    that.setData({
      currentTab: e.detail.current
    });

  },


  //  点击切换tab
  swichNav: function(e) {
    let that = this;

    // 获取当前的current
    var now = that.data.currentTab
    console.log('当前的current:', now)
    var current = e.currentTarget.dataset.current
    console.log('点击的current：', current)

    if (now != current) {
      that.setData({
        currentTab: current
      })
    } else {
      return false;
    }
  },

  toInformation:function(){
    wx.navigateTo({
      url: '/pages/information/classinfo/classinfo',
    })
  },

  toNotice:function(){
    wx.navigateTo({
      url: '/pages/information/notice/notice',
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