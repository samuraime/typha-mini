const { scroll, request } = require('../../utils/index');

const app = getApp();

Page({
  data: {
    title: '',
    photos: [],
    tags: [],
    views: 0,
    stars: 0,
  },
  onLoad(e) {
    const { id } = e;
    request.get(`/albums/${id}`, null, ({ data: album }) => {
      const { title, photos, tags, views, stars } = album;
      this.setData({ title, photos, tags, views, stars });
      console.log(album)
      wx.setNavigationBarTitle({
        title,
      });
    });
  },
  // star/unstar
  handleStar(e) {
    const { id, index, starred } = e.target.dataset;
    const method = starred ? 'delete' : 'put';
    request[method](`/photo/starred/${id}`, null, ({ data: photo }) => {
      this.setData({
        [`photos[${index}].starred`]: photo.starred,
        [`photos[${index}].stars`]: photo.stars,
      });
    });
  },
  handlePreview(e) {
    const { index } = e.target.dataset;
    wx.previewImage({
      current: this.data.photos[index].url,
      urls: this.data.photos.map(_ => _.url),
    });
  },
});
