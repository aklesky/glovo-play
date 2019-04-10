import { logger } from '../utils/logger';
import { getJsonData } from '../utils/data';
import { isStoreOpen } from '../utils/schedule';

export const Categories = {
  AppQuery: {
    Categories: () => {
      try {
        const response = getJsonData('categories.json');
        const { categories } = response;

        const currentDate = new Date();
        return categories.map(item => {
          const store = getJsonData(`${item.name}.json`);
          const { stores } = store;

          return {
            ...item,

            active: stores.reduce((_, current) => {
              const isClosed = isStoreOpen(current, currentDate);
              return isClosed;
            }, true)
          };
        }).sort((a, b) => {
          return a.active < b.active;
        });
      } catch (e) {
        logger.error(e.message);
        return [];
      }
    }
  }
};
