// see http://vuejs-templates.github.io/webpack for documentation.
// 配置文件，用来定义开发环境和生产环境中所需要的参数

var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8888,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
      // 代理表，用来建立一个虚拟api服务器代理本机的请求，只能用于开发模式
      // vue-cli使用这个功能是借助http-proxy-middleware插件，一般解决跨域请求api
      // 详细配置见https://github.com/chimurai/http-proxy-middleware
      // 该项目使用了axios，所以没在这里配置
    proxyTable: {
        // '/api/': {
        //     target: 'http://localhost:3000',
        //     changeOrigin:true,
        //     pathRewrite: {
        //         '^/api': ''
        //     }
        // }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
