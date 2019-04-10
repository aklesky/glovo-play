import { logger } from './logger';

const dateObjectTypes = {
  weekday: 'weekday',
  hours: 'hour',
  minutes: 'minute'
};

export const parseTime = (time, currentDate) => {
  try {
    if (!time) {
      return false;
    }
    const current = currentDate || new Date();
    const [hours, minutes] = time.split(':');
    current.setHours(parseInt(hours, 0));
    current.setMinutes(parseInt(minutes, 0));
    return current;
  } catch (e) {
    logger.error(e.message);
    return false;
  }
};

export const isClosed = (time, current) => {
  if (!time || !current) {
    return -1;
  }

  const scheduled = time instanceof Date ? time : parseTime(time);

  return current > scheduled;
};

export const findDistance = (expected, fromToday) => (expected + 6 - fromToday) % 6;

export const formatDate = date => {
  const format = new Intl.DateTimeFormat('en-DE', {
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit'
  }).formatToParts(date);
  return format.reduce((initial, part) => {
    const formatted = {
      ...initial
    };
    if (part.type === dateObjectTypes.weekday) {
      formatted.weekday = part.value;
    }
    if (part.type === dateObjectTypes.hours) {
      formatted.hours = part.value;
    }
    if (part.type === dateObjectTypes.minutes) {
      formatted.minutes = part.value;
    }
    return formatted;
  }, dateObjectTypes);
};
