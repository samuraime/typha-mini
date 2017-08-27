const request = require('./request');
const scroll = require('./scroll');
const token = require('./token');

function formatNumber(number, decimals = 0) {
  return Number.parseFloat(number)
    .toFixed(decimals)
    .toString()
    .replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
}

function formatTime(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return [year, month, day].map(padZero).join('/') + ' ' + [hour, minute, second].map(padZero).join(':');
}

function padZero(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

module.exports = {
  request,
  scroll,
  token,
  formatTime,
  formatNumber,
};
