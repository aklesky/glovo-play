import { should } from 'chai';
import { parseTime, isOpen, findDistance, formatDate } from './date';
import { sundayStore, wednesdayStore, fridayStore } from '../../mock/store';

should();

describe('Date utils suite', () => {
  let currentDate = null;
  const expectingDate = new Date('2019-04-07T14:00:00Z');

  beforeEach(() => {
    currentDate = new Date('2019-04-07T21:00:00Z');
  });

  afterEach(() => {
    currentDate = null;
  });

  it('parseTime should not be undefined.', () => {
    parseTime.should.be.a('function');
  });

  it('parseTime should be falsy if time is not defined', () => {
    const time = parseTime();
    time.should.be.false;
  });

  it('parseTime Date should return the time and minutes from string', () => {
    const time = parseTime('18:00', expectingDate);
    time.getHours().should.be.equal(18);
    time.getMinutes().should.be.equal(0);
  });

  it('Current time should be greater than 18:00', () => {
    const time = parseTime('18:00', expectingDate);
    const diff = currentDate > time;
    diff.should.be.true;
  });

  it('isOpen should be a function', () => {
    isOpen.should.be.a('function');
  });

  it('isClosed should return -1 if date has not been passed', () => {
    isOpen().should.be.equal(-1);
  });
  it('isClosed should return true if current time is greater than 18:00', () => {
    isOpen(expectingDate.setHours(19), currentDate).should.be.true;
  });

  it('findDistance should be a function and return 1 difference from day 5', () => {
    findDistance.should.be.a('function', 'findDistance is undefined');
    findDistance(sundayStore.day, 5).should.be.eq(1);
  });

  it('formatDate should be a function', () => {
    formatDate.should.be.a('function');
  });

  it('formatDate should return an object with weeday, hour, and minute equals to Wednesday, 12:00', () => {
    const distance = findDistance(wednesdayStore.day, 5);
    const openTime = parseTime(wednesdayStore.open, expectingDate);

    currentDate.setDate(openTime.getDate() - 2);
    formatDate(openTime.setDate(currentDate.getDate() + distance)).should.be.eql({
      weekday: 'Wednesday',
      hours: '12',
      minutes: '00'
    });
  });

  it('formatDate should return an object with weekday, hour, and minute equals to Sunday, 12:00', () => {
    const openTime = parseTime(wednesdayStore.open, expectingDate);

    const distance = findDistance(sundayStore.day, currentDate.getDay());
    formatDate(openTime.setDate(currentDate.getDate() + distance)).should.be.eql({
      weekday: 'Sunday',
      hours: '12',
      minutes: '00'
    });
  });

  it('formatDate should return an object with weekday, hour, and minute equals to Friday, 12:00', () => {
    const openTime = parseTime(fridayStore.open, expectingDate);

    const distance = findDistance(fridayStore.day, currentDate.getDay());
    formatDate(openTime.setDate(expectingDate.getDate() + distance)).should.be.eql({
      weekday: 'Friday',
      hours: '12',
      minutes: '00'
    });
  });
});
