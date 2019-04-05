import { logger } from '../utils/logger';
import { getJsonData } from '../utils/data';
import { isClosed, parseTime } from '../utils/date';

export const Categories = {
  AppQuery: {
    Categories: () => {
      try {
        const response = getJsonData('categories.json');
        const { categories } = response;

        return categories.map(item => {
          const store = getJsonData(`${item.name}.json`);
          const { stores } = store;

          return {
            ...item,
            active: stores.reduce((_, current) => {
              return current.schedule.reduce((__, schedule) => {
                return !isClosed(parseTime(schedule.close));
              }, true);
            }, true),
          };
        });
      } catch (e) {
        logger.error(e.message);
        return [];
      }
    }
  }
};
