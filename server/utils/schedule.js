import { isClosed, parseTime, findDistance, formatDate } from './date';
import { logger } from './logger';
import i18n from '../../i18n/en.json';
import _ from './strings';

export const isStoreClosed = (store, currentDate) => {
  const { schedule } = store;

  const day = currentDate.getDay();

  const current = schedule.find(item => item.day === day);

  if (!current) {
    return true;
  }

  return !isClosed(current.open, currentDate) || isClosed(current.close, currentDate);
};

export const findNextOpeningDay = (schedule, currentDate) => {
  const fromToday = currentDate.getDay();

  const next = schedule
    .sort((a, b) => a.day > b.day)
    .find(item => item.day >= 0 && item.day > fromToday);

  const distance = findDistance(next.day, fromToday);
  const openTime = parseTime(next.open).setDate(currentDate.getDate() + distance);

  const dateInfo = formatDate(openTime);
  return _.format(i18n.nextOpenDay)(dateInfo.weekday, dateInfo.hour, dateInfo.minute);
};

export const nextOpenHours = (store, currentDate) => {
  try {
    const { schedule } = store;
    const day = currentDate.getDay();

    const current = schedule.find(item => item.day === day);

    if (!current) {
      return findNextOpeningDay(schedule, currentDate);
    }

    const storeIsOpen = !isClosed(current.open, currentDate);

    if (storeIsOpen) {
      const openTime = parseTime(current.open);
      return _.format(i18n.willOpenToday)(openTime.getHours(), openTime.getMinutes());
    }

    const storeIsClosed = isClosed(current.close, currentDate);

    if (!storeIsOpen && !storeIsClosed) {
      return i18n.isOpenNow;
    }

    return findNextOpeningDay(schedule, currentDate);
  } catch (e) {
    logger.error(e.message);
    return false;
  }
};

export const orderBySchedule = stores => {
  if (!stores || !stores.length) {
    return [];
  }

  const currentDate = new Date();

  return stores
    .map(store => {
      return {
        ...store,
        is_closed: isStoreClosed(store, currentDate),
        open: nextOpenHours(store, currentDate)
      };
    })
    .sort((a, b) => {
      return a.is_closed - b.is_closed;
    });
};
