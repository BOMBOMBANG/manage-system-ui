const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
// const nodeExternals = require('webpack-node-externals')

module.exports = {
  // target: 'node',
  lintOnSave: true,
  configureWebpack:{
    output: {
      publicPath: '/'
    },
    // target: 'node',
    externals: {
      'element': 'ELEMENT',
      'iview': 'iView',
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'babel-polyfill': 'window',
      'echarts': 'echarts'
    }
    // alias: {
    //   vue: 'vue/dist/vue.js'
    // },
    // extensions: ['', '.js', '.vue'],
  },
  chainWebpack: (config) => {
    config
      .entry('./src/main.js')
      .add('babel-polyfill')
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('~', resolve('src/components'))
      .set('^', resolve('src/utils'))
    config.module
      .rule('iview')
      .test(/iview.src.*?js$/)
      .use('babel')
        .loader('babel-loader')
        .end()
  },
  devServer: {
    disableHostCheck: true
  }
}