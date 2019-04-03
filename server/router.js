import KoaRouter from 'koa-router';
import { logger } from './utils/logger';
import { getJsonData } from './utils/data';

export const router = new KoaRouter();
const supportedCategories = ['restaurants', 'snacks', 'wonders', 'gifts'];

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
