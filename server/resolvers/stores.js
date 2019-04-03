import { logger } from "../utils/logger";
import { getJsonData } from '../utils/data';

export const Stores = {
  AppQuery: {
    Stores: (_, { category }) => {
      try {
        const response = getJsonData(`${category}.json`);
        return response.stores;
      } catch (e) {
        logger.error(e.message);
        return [];
      }
    }
  }
};
