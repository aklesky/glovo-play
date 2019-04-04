
import { should } from 'chai';
import { parseTime, isClosed } from './date';

should();

describe('Date utils suite', () => {
  it('parseTime should not be undefined.', () => {
    parseTime.should.be.a('function');
  })

  it('parseTime should be falsy if time is not defined', () => {
    const time = parseTime();
    time.should.be.false;
  })

  it('parseTime Date should return the time and minutes from string', () => {
    const time = parseTime('18:00');
    time.getHours().should.be.equal(18);
    time.getMinutes().should.be.equal(0);
  })


  it('Current time should be greater than 18:00', () => {
    const time = parseTime('18:00');
    const current = new Date();
    const diff = current > time;
    diff.should.be.true;
  })

  it('isClosed should be a function', () => {
    isClosed.should.be.a('function');
  })

  it('isClosed should return -1 if date has not been passed', () => {
    isClosed().should.be.equal(-1);
  })
  it('isClosed should return true if current time is greater than 18:00', () => {
    isClosed(parseTime('18:00')).should.be.true;
  })
});
