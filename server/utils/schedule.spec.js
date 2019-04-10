import chai, { should } from 'chai';
import sorted from 'chai-sorted';
import { orderBySchedule } from './schedule';
import { stores } from '../../mock/stores';

chai.use(sorted);
should();

describe('Schedule Suite', () => {
  it('orderBySchedule function should be a function', () => {
    orderBySchedule.should.be.a('function');
  });

  it('Schedule stores should be ordered, closed stores should be on the end of an array', () => {
    const sortedStores = orderBySchedule(stores);

    sortedStores.should.be.sortedBy('is_closed', { descending: false});
  });
});
