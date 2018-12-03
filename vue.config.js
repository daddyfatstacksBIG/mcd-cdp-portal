const path = require('path');

module.exports = {
  devServer: {
    useLocalIp: true,
    host: 'localhost',
    port: 8080,
    https: false,
    disableHostCheck: true
  },
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        fonts: path.resolve(__dirname, './src/assets/fonts'),
        styles: path.resolve(__dirname, './src/styles')
      }
    },
    plugins: [
      // new MyAwesomeWebpackPlugin()
    ]
  }
}