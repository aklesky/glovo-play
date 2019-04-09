/* eslint-disable global-require */
import fs from 'fs';
import { getDataFromTree } from 'react-apollo';
import { ServerStyleSheet } from 'styled-components';
import { renderToNodeStream } from 'react-dom/server';
import co from 'co';
import { Readable } from 'stream';
import { client } from '../../../src/utils/apollo';
import { logger } from '../logger';
import { appBundle } from '../../../config';
import { renderMetaTags } from './helmet';

class View extends Readable {
  context = null;

  constructor(context) {
    super();
    this.context = context;
    co.call(this, this.render).catch(context.onerror);
  }

  _read() {}

  *render() {
    this.push('<!DOCTYPE html><html lang="en">');
    const data = fs.readFileSync(appBundle, 'utf8');
    const [head, footer] = data.split('<!-- AppRoot -->');


    logger.info(this.context.url);
    const sheet = new ServerStyleSheet();
    const { staticApp } = require('@/entries/server');

    const apollo = client(process.browser);
    const app = staticApp(apollo, this.context.url);

    const jsx = sheet.collectStyles(app);

    const dataFromTree = yield done =>
      getDataFromTree(jsx).then(() => {
        logger.info('React Queries have been collected.');
        const extracted = apollo.extract();
        const metaTags = renderMetaTags();
        logger.info(metaTags);
        this.push(head.replace('<!-- metaTags -->', metaTags));
        return done(
          null,
          `<script>window.__APOLLO_STATE__=${JSON.stringify(extracted).replace(
            /</g,
            '\\u003c'
          )};</script>`
        );
      });



    const stream = sheet.interleaveWithNodeStream(renderToNodeStream(jsx));

    stream.on('data', html => {
      logger.info(html);
      this.push(html);
    });

    stream.on('end', () => {
      this.push(footer.replace('<!-- AppState -->', dataFromTree));
      this.push('</html>');
      this.push(null);
    });
  }

  static getReadable(context) {
    return new View(context);
  }
}

export default View;
