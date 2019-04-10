import webpack from 'webpack';
import koaWebpack from 'koa-webpack';
import client from '../config/webpack/client';
import { appWithWebpackMiddleware } from './koa';

const compiler = webpack(client);

const middleware = koaWebpack({
  compiler,
  config: {
    watch: false,
  },
  devMiddleware: {
    writeToDisk: true
  },
  hotClient: {
    reload: true,
  }
});

appWithWebpackMiddleware(middleware);
