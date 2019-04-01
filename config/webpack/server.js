import merge from 'webpack-merge';
import common from './common';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import nodeExternals from 'webpack-node-externals';

import { isProduction } from '../env';
import { distServer, node_modules, app } from '../paths';
import { files } from '../files';
import { bundle } from '../bundle';

const base = {
  name: 'server',
  mode: isProduction ? 'production' : 'development',
  devtool: !isProduction ? 'cheap-eval-source-map' : false,
  entry: {
    server: app
  },
  externals: [nodeExternals()],
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: distServer
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
                  publicPath: bundle.media.publicPath,
                  emitFiles: false
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
                  publicPath: bundle.fonts.publicPath,
                  emitFiles: false
                }
              }
            ]
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [node_modules]
  },
  target: 'node',
  plugins: [
    new CleanWebpackPlugin(),
  ]
};

export default merge(common, base);
