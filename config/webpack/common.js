import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import { root, node_modules, source, mediaDirectory } from '../paths';
import i18n from '../../i18n/en.json';

export default {
  context: root,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx'],
    modules: [node_modules],
    alias: {
      '@': source,
      'media': mediaDirectory,
    }
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true,
        terserOptions: {
          safari10: true,
          output: {
            comments: false,
          }
        },
        test: /\.js(\?.*)?$/i
      })
    ],
    removeAvailableModules: true,
    removeEmptyChunks: true,
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|styled-components|react-router|react-router-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all',
          reuseExistingChunk: true,
          priority: 1
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'modules',
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
