// pages/statistics/index.js
const utils=require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calendarArray: ['一', '二', '三', '四', '五', '六', '日'],
  },
  // 跳转
  jump(){
    wx.navigateTo({
      url: './detail/index',
    })
  },
  activeDay(e) {
    const { index } = e.currentTarget.dataset
    this.setData({
      activeIndex: index
    })
  },
  getTime(){
    let time = utils.formatDate(new Date());
    let date=utils.getDates(7, time);
    date.forEach(v=>{
      v.day=v.time.slice(8,10)
    })
    this.setData({
      date
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTime()
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