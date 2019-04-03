/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import fs from 'fs';
import { appBundle } from '../../config';
import { streamReactApplication } from '../utils/react';
import { logger } from '../utils/logger';


export const useServerSideRendering = async ctx => {
  const { res } = ctx;
  res.respond = false;
  try {
    res.statusCode = 200;
    const data = fs.readFileSync(appBundle, 'utf8');
    const [head, footer] = data.split('<!-- AppRoot -->');
    res.write('<!DOCTYPE html><html lang="en">');
    res.write(head);

    const stream = streamReactApplication();
    stream.pipe(res, { end: false});

    stream.on('end', () => {
      res.write(footer);
      res.write('</html>');
      res.end();
    });

  } catch(e) {
    res.statusCode = 404;
    res.body = `${appBundle} is not readable.`
    logger.error(`${appBundle} is not readable.`)
    res.end();
  }
}
