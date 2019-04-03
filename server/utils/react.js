/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { renderToNodeStream } from 'react-dom/server';
import { logger } from './logger';

export const streamReactApplication = () => {
  try {
  const { staticApp } = require('@/entries/server');
  const stream = renderToNodeStream(staticApp());
  return stream;
  } catch (e) {
    logger.error(e.message);
    return false;
  }
}
