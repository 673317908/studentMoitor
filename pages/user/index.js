// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [
      {
        id: 1,
        text: "我的孩子",
        icon: "iconfont icon-haizi",
        route: "./child/index"
      },
      {
        id: 2,
        text: "时间表",
        icon: "iconfont icon-shijianbiao",
        route: "./time/index"
      },
      {
        id: 3,
        text: "历史考勤记录",
        icon: "iconfont icon-lishijilu",
        route: "./record/index"
      }
    ]
  },
  jump(e) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({
      url: url,
    })
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