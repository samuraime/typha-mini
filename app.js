const request = require('./utils/request');
const token = require('./utils/token');

App({
  onLaunch() {
    wx.checkSession({
      success() {
        if (!token.get()) {
          request.login();
        }
      },
      fail() {
        request.login();
      },
    });
  },

  getUserInfo(callback) {
    if (this.globalData.userInfo) {
      request.get('/user', null, ({ data: user }) => {
        this.globalData.userInfo = user;
        callback && callback(user);
      });
    } else {
      wx.getUserInfo({
        success: (res) => {
          // refresh and update
          request.put('/user', res.userInfo, ({ data: user }) => {
            this.globalData.userInfo = user;
            callback && callback(user);
          });
        },
        fail() {
          console.log('get userInfo fail');
        },
      });
    }
  },

  globalData: {
    userInfo: null,
  },
});
