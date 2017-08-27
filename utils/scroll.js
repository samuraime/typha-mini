const request = require('./request');

/**
 * mixin scroll method
 */
const scroll = ({ page, endpoint, perPage = 10 }) => Object.assign({}, page, {
  data: Object.assign({}, page.data || {}, {
    isLoading: false,
    isEnd: false,
    list: [],
    page: 0,
    perPage,
  }),
  loadNext() {
    if (this.data.isLoading || this.data.isEnd) {
      return;
    }
    this.setData({
      isLoading: true,
    });
    const nextPage = this.data.page + 1;
    request.get(endpoint, {
      page: nextPage,
      perPage,
    }, ({ data: list }) => {
      const update = {};
      const length = this.data.list.length;
      const isEnd = list.length < perPage;
      list.forEach((item, i) => {
        update[`list[${length + i}]`] = item;
      })
      this.setData(Object.assign({}, update, {
        isEnd,
        isLoading: false,
        page: nextPage,
      }));
    }, () => {
      this.setData({
        isLoading: false,
      });
    });
  },
  handleScroll(e) {
    const { scrollTop, scrollHeight, deltaY } = e.detail;
    if (deltaY > 0) {
      return;
    }
    if (!this.data.isLoading && scrollHeight - scrollTop < 1000) {
      this.loadNext();
    }
  },
});

module.exports = scroll;
