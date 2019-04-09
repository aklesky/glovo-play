import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import BrotliCompression from 'brotli-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import common from './common';
import { isProduction } from '../env';
import {
  distClient,
  publicPath,
  template,
  publicEntry,
  robots,
  workBoxConfig,
  swCore
} from '../paths';
import i18n from '../../i18n/en.json';
import { colors } from '../../src/theme/colors';
import { files } from '../files';
import { bundle } from '../bundle';
import { progressive } from './progressive';

const base = {
  name: 'client',
  target: 'web',
  output: {
    pathinfo: true,
    publicPath,
    path: distClient,
    filename: 'assets/js/app.[hash].js',
    chunkFilename: 'assets/js/[name].[chunkHash].js'
  },
  entry: {
    app: ['@babel/polyfill', publicEntry]
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
      filename: isProduction ? 'app.html' : 'index.html',
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
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: robots,
        to: distClient,
        cache: isProduction
      },
      {
        from: workBoxConfig,
        to: swCore
      }
    ])
  ]
};

const production = {
  mode: 'production',
  devtool: false,
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CompressionPlugin({
      cache: true,
      minRatio: 0.99,
      threshold: 10240,
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/
    }),
    new BrotliCompression({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};

const development = {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/
      }
    ]
  }
};

export default merge(common, base, progressive, isProduction ? production : development);
