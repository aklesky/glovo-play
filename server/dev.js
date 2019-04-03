import webpack from 'webpack';
import koaWebpack from 'koa-webpack';
import client from '../config/webpack/client';
import { appWithWebpackMiddleware } from './koa';

const compiler = webpack(client);

const middleware = koaWebpack({
  compiler,
  config: {
    watch: true
  },
  devMiddleware: {
    writeToDisk: false
  }
});

appWithWebpackMiddleware(middleware);
