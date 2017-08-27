const { scroll, request } = require('../../utils/index');

const app = getApp();

const scrollPage = scroll({
  endpoint: '/albums',
  page: {
    data: {
    },
    onLoad() {
      wx.setNavigationBarTitle({
        title: 'Explore',
      });
      this.loadNext();
    },
    // star/unstar
    handleStar(e) {
      const { id, starred } = e.target.dataset;
      const method = starred ? 'delete' : 'put';
      request[method](`/album/starred/${id}`, null, ({ data: album }) => {
        const index = this.data.list.findIndex(_ => _._id === id);
        this.setData({
          [`list[${index}].starred`]: album.starred,
          [`list[${index}].stars`]: album.stars,
        });
        if (album.starred) {
          wx.showToast({
            title: 'Faved',
            icon: 'success',
            duration: 1000,
          });
        }
      });
    },
  },
});

Page(scrollPage);
