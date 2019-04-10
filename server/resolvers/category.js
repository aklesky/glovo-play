import { logger } from '../utils/logger';
import { getJsonData } from '../utils/data';
import { orderBySchedule } from '../utils/schedule';

export const Stores = {
  AppQuery: {
    Category: (_, { category, tag }) => {
      try {
        const file = getJsonData('categories.json');

        const { categories } = file;

        const current = categories.find(item => item.name === category);

        const response = getJsonData(`${category}.json`);
        const { stores } = response;

        const filter = tag ? tag.trim() : null;

        return {
          current: {
            ...current,
            active: true,
          },
          stores: orderBySchedule(
            filter && filter.length >= 2
              ? stores.filter(item => item.tags.includes(filter))
              : stores
          )
        };
      } catch (e) {
        logger.error(e.message);
        return [];
      }
    }
  }
};
