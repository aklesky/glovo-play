import Koa from 'koa';
import serve from 'koa-static';
import cors from '@koa/cors';
import compress from 'koa-compress';
import { useServerSideRendering } from './middlewares/ssr';
import { distClient, port } from '../config';
import { useApollo } from './middlewares/apollo';


import { router } from './router';
import { logger } from './utils/logger';


export const setupServer = () => {
  const app = new Koa();

  const apollo = useApollo(app);

  app
    .use(serve(distClient, { defer: true}))
    .use(cors());


  return {
    app,
    apollo,
  };
}

export const appWithWebpackMiddleware = async (middleware) => {
  const { app } = setupServer();
  app.use(await middleware);
  app.use(router.routes());

  app.listen(port, () => {
    logger.info(`listening to port ${port}`);
  });

  return app;
}

export const appWithServerSideRendering = () => {
  const { app } = setupServer();

  router.get('/', useServerSideRendering);

  app.use(router.routes());
  app.use(compress());

  app.listen(port, () => {
    logger.info(`listening to port ${port}`);
  });
  return app;
}

