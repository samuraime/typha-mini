const token = require('./token');
const { URL: baseURL } = require('../config');

const methods = ['get', 'post', 'put', 'delete'];

const defaultFail = (res) => {
  console.log('request fail', res);
};

const request = (method) => (url, data, success, fail = defaultFail) => {
  wx.request({
    url: /^http|\/\//.test(url) ? url : `${baseURL}${url}`,
    method: method.toUpperCase(),
    data: data || {},
    header: token.getHeader(),
    success(res) {
      if (res.statusCode >= 400) {
        if (res.statusCode === 401) {
          token.set(null);
          login(() => {
            request(method)(url, data, success, fail);
          });
          return;
        }
        fail(res);
        return;
      }
      success && success(res);
    },
    fail(res) {
      fail(res);
    },
  });
};

const login = (success, fail = () => {}) => {
  wx.login({
    success(res) {
      if (res.code) {
        wx.request({
          url: `${baseURL}/login`,
          method: 'POST',
          data: { code: res.code },
          success(res) {
            if (res.statusCode >= 400) {
              fail(res);
              return;
            }
            token.set(res.data.token);
            success && success();
          },
          fail,
        });
      };
    },
    fail,
  });
};

module.exports.login = login;

methods.forEach((method) => {
  module.exports[method] = request(method);
});
