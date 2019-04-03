import jsonfile from 'jsonfile';
import { join } from 'path';
import { logger } from './logger';
import { data } from '../../config';

export const getJsonData = filename => {
  try {
    return jsonfile.readFileSync(join(data, filename), {
      encoding: 'utf8',
    })
  } catch (e) {
    logger.error(e.message);
    return false;
  }
}
