// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 授权登录
   */
  getUserInfo(e) { 
    console.log(e)
  },

  /**
   * 取消登录
   */
  onNotLogin() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  /**
   * 授权成功 跳转回原页面
   */
  onNavigateBack(delta) {
    wx.navigateBack({
      delta: Number(delta || 1)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})