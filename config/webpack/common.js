import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import { root, nodeModules, source, mediaDirectory } from '../paths';

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
    modules: [nodeModules],
    alias: {
      '@': source,
      media: mediaDirectory
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
            comments: false
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
