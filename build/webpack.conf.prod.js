const webpack = require('webpack')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const fs = require('fs')
const utils = require('./utils')
const debug = false

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        include: utils.isPathIn('../src', debug),
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      },
      {
        test: /\.vue$/,
        include: utils.isPathIn(['../src', '../node_modules/vue2-google-maps'], debug),
        loader: 'vue-loader',
        options: {
          transformAssetUrls: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        include: utils.isPathIn('../src', debug),
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        include: utils.isPathIn(['../src/assets/images', '../../../fenixedu/vue-porg'], debug),
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]',
          outputPath: 'images'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        include: utils.isPathIn('../src/assets/media', debug),
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]',
          outputPath: 'media'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        include: utils.isPathIn('../src/assets/fonts', debug),
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]',
          outputPath: 'fonts'
        }
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb|pt/),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    new FriendlyErrorsWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: 'node_modules/vue-porg/dist/tasksource.vue-porg.js', to: 'tasksource.vue-porg.js' },
      { from: 'node_modules/vue-porg/dist/tasksource.vue-porg.css', to: 'css/tasksource.vue-porg.css' }
    ], {})
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      'vue$': 'vue/dist/vue.runtime.esm.js'
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimize: true
  },
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
