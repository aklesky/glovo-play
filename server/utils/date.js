import { logger } from './logger';

export const parseTime = time => {
  try {
    if (!time) {
      return false;
    }
    const current = new Date();
    const [hours, minutes] = time.split(':');
    current.setHours(hours);
    current.setMinutes(minutes);
    return current;
  } catch (e) {
    logger.error(e.message);
    return false;
  }
};

export const isClosed = time => {
  if (!time) {
    return -1;
  }
  const current = new Date();
  return current > time;
};
