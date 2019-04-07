import { should } from 'chai';
import { parseTime, isClosed, findDistance, formatDate } from './date';
import { sundayStore, wednesdayStore, fridayStore } from '../../mock/store';

should();

describe('Date utils suite', () => {
  it('parseTime should not be undefined.', () => {
    parseTime.should.be.a('function');
  });

  it('parseTime should be falsy if time is not defined', () => {
    const time = parseTime();
    time.should.be.false;
  });

  it('parseTime Date should return the time and minutes from string', () => {
    const time = parseTime('18:00');
    time.getHours().should.be.equal(18);
    time.getMinutes().should.be.equal(0);
  });

  it('Current time should be greater than 18:00', () => {
    const time = parseTime('18:00');
    const current = new Date();
    current.setHours(22);
    const diff = current > time;
    diff.should.be.true;
  });

  it('isClosed should be a function', () => {
    isClosed.should.be.a('function');
  });

  it('isClosed should return -1 if date has not been passed', () => {
    isClosed().should.be.equal(-1);
  });
  it('isClosed should return true if current time is greater than 18:00', () => {
    const current = new Date();
    current.setHours(22);
    isClosed('18:00', current).should.be.true;
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
    const openTime = parseTime(wednesdayStore.open);
    const currentTime = new Date();
    currentTime.setDate(openTime.getDate() - 2);
    formatDate(openTime.setDate(currentTime.getDate() + distance)).should.be.eql({
      weekday: 'Wednesday',
      hours: '12',
      minutes: '00'
    });
  });

  it('formatDate should return an object with weeday, hour, and minute equals to Sunday, 12:00', () => {
    const openTime = parseTime(wednesdayStore.open);

    const currentTime = new Date();
    const distance = findDistance(sundayStore.day, currentTime.getDay());
    currentTime.setDate(openTime.getDate() - 0);
    formatDate(openTime.setDate(currentTime.getDate() + distance)).should.be.eql({
      weekday: 'Sunday',
      hours: '12',
      minutes: '00'
    });
  });
  it('formatDate should return an object with weeday, hour, and minute equals to Friday, 12:00', () => {
    const openTime = parseTime(fridayStore.open);
    const currentTime = new Date();
    currentTime.setDate(openTime.getDate() - 0);

    const distance = findDistance(fridayStore.day, currentTime.getDay());
    formatDate(openTime.setDate(currentTime.getDate() + distance)).should.be.eql({
      weekday: 'Friday',
      hours: '12',
      minutes: '00'
    });
  });
});
