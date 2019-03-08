export default class modals {
  constructor() {
    this.isLoading = false;
  }

  static modalTwo(text, title = '提示', conText, quxiao) {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title,
        content: text,
        showCancel: quxiao,
        confirmText: conText,
        confirmColor: '#D85B3F',
        success: res => {
          resolve(res)
          confirm(res.cancel)
        },
        fail: res => {
          reject(res);
        }
      })
    })
  }

  static showToast(tittle, ion) {
    return new Promise((resolve, reject) => {
      wx.showToast({
        title: tittle,
        icon: ion,
        duration: 2000
      })
    })
  }

  static bigimg(img) {
    var that = this
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表（重点）
    })
  }

  static hideLoading(tittle) {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: tittle,
      })

      setTimeout(function() {
        wx.hideLoading()
      }, 2000)
    })
  }

  // 带参数跳转页面
  static navigate(urllink, str) {
    return new Promise((resolve, reject) => {
      if (str) {
        wx.navigateTo({
          url: urllink + str,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      } else {
        wx.navigateTo({
          url: urllink,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      }
    })
  }

  // 不带参数跳转页面
  static toswitch(url) {
    wx.switchTab({
      url: url,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {}
    })
  }

  // 数据加载中显示的内容
  static loading(title = '加载中') {
    if (modals.isLoading) {
      return;
    }
    modals.isLoading = true;
    wx.showLoading({
      title: title,
      mask: true
    });
  }

  static loaded() {
    if (modals.isLoading) {
      modals.isLoading = false;
      wx.hideLoading();
    }
  }

  static error(title, onHide) {
    wx.showToast({
      title: title,
      image: '/imgs/index//error.png',
      mask: true,
      duration: 500
    });
    if (onHide) {
      setTimeout(() => {
        onHide();
      }, 500);
    }
  }

}

modals.isLoading = false;

function confirm(con) {
  if (con == false) {
    console.log('确定')
  } else {
    console.log('取消')
  }
}