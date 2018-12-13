const path = require('path');

module.exports = {
  runtimeCompiler: true,
  devServer: {
    useLocalIp: true,
    host: 'localhost',
    port: 8080,
    https: false,
    disableHostCheck: true
  },
  chainWebpack: config => {
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'production') {
      config.plugins.delete('pwa');
      config
        .plugin('html')
        .tap(args => {
          args[0].minify.removeAttributeQuotes = false;
          return args;
        })
    }
  },
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        components: path.resolve(__dirname, './src/components'),
        fonts: path.resolve(__dirname, './src/assets/fonts'),
        styles: path.resolve(__dirname, './src/styles')
      }
    },
    plugins: [
      // new MyAwesomeWebpackPlugin()
    ]
  }
}
