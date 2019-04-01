import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import common from './common';
import { isProduction } from '../env';
import { distClient, publicPath, template, publicEntry } from '../paths';
import i18n from '../../i18n/en.json';
import { colors } from '../../src/theme/colors';
import { files } from '../files';
import { bundle } from '../bundle';

const base = {
  name: 'client',
  target: 'web',
  output: {
    pathinfo: true,
    publicPath,
    path: distClient,
    filename: 'bundle.[hash].js',
    chunkFilename: '[name].[chunkHash].js'
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: files.images,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[hash:8].[ext]',
                  outputPath: bundle.media.destination,
                  publicPath: bundle.media.publicPath
                }
              }
            ]
          },
          {
            test: files.fonts,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[hash:8].[ext]',
                  outputPath: bundle.fonts.destination,
                  publicPath: bundle.fonts.publicPath
                }
              }
            ]
          }
        ]
      }
    ]
  },
  node: {
    console: true,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  plugins: [
    new HtmlWebPackPlugin({
      inject: true,
      title: i18n.name,
      description: i18n.description,
      template,
      filename: 'app.html',
      hash: false,
      cache: isProduction,
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        'theme-color': colors.primary
      },
      favicon: false,
      minify: {
        collapseWhitespace: isProduction,
        removeRedundantAttributes: isProduction,
        useShortDoctype: isProduction,
        removeEmptyAttributes: isProduction,
        removeStyleLinkTypeAttributes: isProduction,
        keepClosingSlash: isProduction,
        minifyJS: isProduction,
        minifyCSS: isProduction,
        minifyURLs: isProduction
      }
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    }),
    new CleanWebpackPlugin()
  ]
};

const production = {
  mode: 'production',
  devtool: false,
  entry: {
    app: ['@babel/polyfill', publicEntry]
  }
};

const development = {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['react-hot-loader/webpack']
      }
    ]
  },
  entry: {
    app: [
      '@babel/polyfill',
      'webpack-hot-middleware/client?name=client&noInfo=false&timeout=2000',
      publicEntry
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

export default merge(common, base, isProduction ? production : development);
