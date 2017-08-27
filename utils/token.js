const tokenKey = 'auth_token';
let cachedToken = null;

module.exports = {
  get() {
    return cachedToken || wx.getStorageSync(tokenKey);
  },
  set(value) {
    cachedToken = value;
    return wx.setStorageSync(tokenKey, value);
  },
  getHeader() {
    const header = {};
    const token = this.get();
    if (token) {
      header.Authorization = `Bearer ${token}`;
    }
    return header;
  },
};
