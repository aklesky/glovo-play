import KoaRouter from 'koa-router';
import path from 'path';
import fs from 'fs';
import { logger } from './utils/logger';
import { getJsonData } from './utils/data';
import { distClient, distAssets } from '../config';

export const router = new KoaRouter();
const supportedCategories = ['restaurants', 'snacks', 'wonders', 'gifts'];

router.get('/sw.js', async ctx => {
  ctx.type = 'text/javascript';
  ctx.body = fs.readFileSync(path.resolve(distAssets, 'sw.js'));
});
router.get('/robots.txt', async ctx => {
  ctx.type = 'text';
  ctx.body = fs.readFileSync(path.resolve(distClient, 'robots.txt'));
});

router.get('/categories', ctx => {
  try {
  ctx.body = getJsonData('categories.json');
  } catch (e) {
    ctx.status = 503;
    ctx.body = 'Oops. Something went Wrong!'
    logger.error(e.message);
  }
});

router.get('/stores', ctx => {
  const { query } = ctx;
  if (!query || !query.category) {
    ctx.status = 400;
    ctx.body = 'Wrong query';
    logger.error('/stores > Wrong query');
    return;
  }

  const category = query.category.toLowerCase();
  if (!supportedCategories.includes(category)) {
    ctx.status = 404;
    ctx.body = 'Wrong category';
    logger.error('Wrong category');
    return;
  }

  try {
  ctx.body = getJsonData(`${category}.json`);
  } catch (e) {
    logger.error(e.messge);
    ctx.body = 'Wrong category';
  }
});
