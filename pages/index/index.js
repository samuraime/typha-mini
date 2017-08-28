const app = getApp();

Page({
  data: {
    userInfo: {},
  },
  onLoad() {
    app.getUserInfo((userInfo) => {
      console.log(userInfo);
      //更新数据
      this.setData({
        userInfo,
      });
    })
  },
  hideImageMask(name) {
    return (e) => {
      const { index } = e.target.dataset;
      this.setData({
        [`userInfo.${name}[${index}].loaded`]: true,
      });
    };
  },
  hideAlbumMask(e) {
    return this.hideImageMask('albums')(e);
  },
  hidePhotoMask(e) {
    return this.hideImageMask('photos')(e);
  },
  handlePreview(e) {
    const { url } = e.target.dataset;
    wx.previewImage({
      current: url,
      urls: this.data.userInfo.photos.map(_ => _.url),
    });
  },
});
