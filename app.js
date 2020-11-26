//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.getUserInfo({
          success(e) {
            console.log(e)
          },
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 小程序更新
    this.updateManager()
  },
  /**
  * 小程序主动更新
  */
  updateManager() {
    if (!wx.canIUse('getUpdateManager')) {
      return false;
    }
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      // console.log(res.hasUpdate)
    });
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，即将重启应用',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      });
    });
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      })
    });
  },
  /**
 * get请求
 */
  _get(url, data, success, fail, complete, check_login, isShowError = true) {
    wx.showNavigationBarLoading();
    let _this = this;
    const token = wx.getStorageSync('token');
    // 构造请求参数
    data = data || {};
    // if (typeof check_login === 'undefined')
    //   check_login = true;

    // 构造get请求
    let request = function () {
      data.token = wx.getStorageSync('token');
      wx.request({
        url: _this.api_root + url,
        header: {
          'content-type': 'application/json'
        },
        data: data,
        success(res) {
          if (res.statusCode !== 200 || typeof res.data !== 'object') {
            console.log(res);
            if (isShowError)
              _this.showError('网络请求出错');
            return false;
          } else if (res.data.code == -2) {
            fail && fail(res)
            // 跳转维护页面
            // wx.hideNavigationBarLoading();
            // wx.stopPullDownRefresh()
            // wx.hideLoading()
            // _this.doMaintain();
            return false;
          } else if (res.data.code == -3) {
            return _this.doAccountDisabled();
          } else if (res.data.code === -1) {
            _this.removeLogin();
            // 登录态失效, 重新登录
            wx.hideNavigationBarLoading();
            _this.doLogin(2);
          } else if (res.data.code === 0) {
            if (isShowError) {
              wx.hideLoading()
              _this.showError(res.data.msg, function () {
                fail && fail(res);
              });
            } else {
              wx.hideLoading()
              fail && fail(res);
            }

            return false;
          } else {
            success && success(res.data);
          }
        },
        fail(res) {
          if (isShowError) {
            wx.hideLoading()
            _this.showError(res.errMsg, function () {
              fail && fail(res);
            });
          } else {
            wx.hideLoading()
            fail && fail(res);
          }

        },
        complete(res) {
          wx.hideNavigationBarLoading();
          complete && complete(res);
        },
      });
    };
    // 判断是否需要验证登录

    check_login ? (token ? request() : _this.doLogin()) : request();
  },


  /**
   * post提交
   */
  _post_form(url, data, success, fail, complete, isShowNavBarLoading, isShowError = true) {
    let _this = this;

    isShowNavBarLoading || true;
    data.token = wx.getStorageSync('token');

    // 在当前页面显示导航条加载动画
    if (isShowNavBarLoading == true) {
      wx.showNavigationBarLoading();
    }
    wx.request({
      url: _this.api_root + url,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      data: data,
      success(res) {
        if (res.statusCode !== 200 || typeof res.data !== 'object') {
          if (isShowError)
            _this.showError('网络请求出错');
          return false;
        }
        if (res.data.code == -2) {
          fail && fail(res)
          // 跳转维护页面
          // wx.hideNavigationBarLoading();
          // wx.stopPullDownRefresh()
          // wx.hideLoading()
          // _this.doMaintain();
          return false;
        } else if (res.data.code == -3) {
          return _this.doAccountDisabled();
        } else if (res.data.code === -1) {
          _this.removeLogin();
          // 登录态失效, 重新登录
          wx.hideNavigationBarLoading();
          _this.doLogin(1);
          return false;
        } else if (res.data.code === 0 && url != "invitation/validate_user") {
          if (["card/check"].includes(url)) return false;
          if (isShowError) {
            wx.hideLoading()
            _this.showError(res.data.msg, function () {
              fail && fail(res);
            });
          } else {
            wx.hideLoading()
            fail && fail(res)
          }

          return false;
        }
        success && success(res.data);
      },
      fail(res) {
        // console.log(res);
        if (isShowError) {
          wx.hideLoading()
          _this.showError(res.errMsg, function () {
            fail && fail(res);
          });
        } else {
          wx.hideLoading()
          fail && fail(res);
        }

      },
      complete(res) {
        wx.hideNavigationBarLoading();
        // wx.hideLoading();
        complete && complete(res);
      }
    });
  },
  globalData: {
    userInfo: null
  }
})