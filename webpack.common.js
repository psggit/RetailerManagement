const path = require('path');
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const AbsolutePathProviderPlugin = require('abspath-webpack-plugin')

// const ASSET_PATH = process.env.ASSET_PATH || '/'

module.exports = {
  entry: {
    app: './src/App.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      Components: path.resolve(__dirname, 'src/components'),
      Utils: path.resolve(__dirname, 'src/utils'),
      Sass: path.resolve(__dirname, 'src/sass/components'),
      Styles: path.resolve(__dirname, 'src/styles')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new AbsolutePathProviderPlugin(/^@sass/, path.resolve('./src/sass')),
    // new AbsolutePathProviderPlugin(/^@utils/, path.resolve('./src/utils')),
    // new AbsolutePathProviderPlugin(/^@components/, path.resolve('./src/components')),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: './index.html'
    }),
    new webpack.DefinePlugin({
      "process.env.BASE_URL": JSON.stringify(process.env.BASE_URL || "basketball38.hasura-app.io")
    })
  ],
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/admin'
  }
};