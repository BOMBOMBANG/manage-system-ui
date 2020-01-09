const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
// const nodeExternals = require('webpack-node-externals')

module.exports = {
  // target: 'node',
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('~', resolve('src/components'))
      .set('^', resolve('src/utils'))
  },
  devServer: {
    disableHostCheck: true
  }
}