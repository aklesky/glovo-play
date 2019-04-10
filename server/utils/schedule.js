import { parseTime, findDistance, formatDate, isOpen } from './date';
import { logger } from './logger';
import i18n from '../../i18n/en.json';
import _ from './strings';

export const isStoreOpen = (store, currentDate) => {
  const { schedule } = store;

  if (!schedule.length) {
    return false;
  }

  const day = currentDate.getDay();

  const current = schedule.find(item => item.day === day);
  if (!current) {
    return true;
  }

  const open = isOpen(current.open, currentDate);

  const closed = isOpen(current.close, currentDate);

  if (open && !closed) {
    return true;
  }

  return false;
};

export const findNextOpeningDay = (schedule, currentDate) => {
  const fromToday = currentDate.getDay();

  if (!schedule.length) {
    return false;
  }
  const next = schedule
    .sort((a, b) => a.day > b.day)
    .find(item => item.day >= 0 && item.day > fromToday);

  const distance = findDistance(next.day, fromToday);
  const openTime = parseTime(next.open, new Date(currentDate.getTime())).setDate(
    currentDate.getDate() + distance
  );

  const dateInfo = formatDate(openTime);
  return _.format(i18n.nextOpenDay)(dateInfo.weekday, dateInfo.hours, dateInfo.minutes);
};

export const nextOpenHours = (store, currentDate) => {
  try {
    const { schedule } = store;

    if (!schedule.length) {
      return i18n.isClosed;
    }
    const day = currentDate.getDay();

    const current = schedule.find(item => item.day && item.day === day);

    if (!current) {
      return findNextOpeningDay(schedule, currentDate);
    }

    const storeIsOpen = isOpen(current.open, currentDate);
    const storeIsClosed = isOpen(current.close, currentDate);

    if (!storeIsOpen && !storeIsClosed) {
      const openTime = formatDate(parseTime(current.open, new Date(currentDate.getTime())));
      return _.format(i18n.willOpenToday)(openTime.hours, openTime.minutes);
    }

    if (storeIsOpen) {
      return i18n.isOpenNow;
    }

    return findNextOpeningDay(schedule, new Date(currentDate.getTime()));
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
        is_closed: isStoreOpen(store, currentDate),
        open: nextOpenHours(store, new Date())
      };
    })
    .sort((a, b) => {
      return a.is_closed - b.is_closed;
    });
};
