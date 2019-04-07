import { should } from 'chai';
import strings from './strings';

should();

describe('Strings Suite', () => {
  it('string object should have a format function', () => {
    strings.format.should.be.a('function');
  });

  it('string format should return day, week, year', () => {
    strings
      .format('%s, %s, %s')(12, 1, 1985)
      .should.be.equal('12, 1, 1985');
  });
  it('string format should return Next Opening hours on Wednesday at 12:00', () => {
    strings
      .format('Next Opening hours on %s at %s')('Wednesday', '12:00')
      .should.be.equal('Next Opening hours on Wednesday at 12:00');
  });
});
