
import { logger } from '../utils/logger';
import { getJsonData } from '../utils/data';

export const Categories = {
  AppQuery: {
    Categories: () => {
      try {
      const response = getJsonData('categories.json');
      return response.categories;
      } catch (e) {
        logger.error(e.message);
        return [];
      }
    },
  }
};
