// pages/user/record/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filterDate: ""
  },
  getDate() {
    var date = new Date()
    var Y = date.getFullYear()
    var M = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + date.getMonth() + 1
    var D = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
    var time = Y + '-' + M + '-' + D
    this.setData({
      filterDate: time
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDate()
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