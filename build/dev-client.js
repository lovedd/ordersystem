// 这个文件主要是注入到浏览器，监听webpack-hot-middleware传过来的事件，如reload action。用于代码热更新等

/* eslint-disable */
require('eventsource-polyfill')
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
