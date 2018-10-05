const path = require('path');

module.exports = {
  entry: './src/vue/main.js',
  output: {
    path: path.join(__dirname, 'src/public/admin/js'),
    filename: 'app.js'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: {
          loader: 'vue-loader'
        }
      }
    ]
  },
  devServer: {
    port: 3000
  }
};