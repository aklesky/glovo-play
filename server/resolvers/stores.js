import { logger } from '../utils/logger';
import { getJsonData } from '../utils/data';
import { orderBySchedule } from '../utils/schedule';

export const Stores = {
  AppQuery: {
    Stores: (_, { category, tag }) => {
      try {
        const response = getJsonData(`${category}.json`);
        const { stores } = response;

        const filter = tag ? tag.trim() : null;
        logger.info(stores);
        return orderBySchedule(
          filter && filter.length >= 2 ? stores.filter(item => item.tags.includes(filter)) : stores
        );
      } catch (e) {
        logger.error(e.message);
        return [];
      }
    }
  }
};
