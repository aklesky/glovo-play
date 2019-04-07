import { should } from 'chai';
import { orderBySchedule } from './schedule';
import { stores } from '../../mock/stores';

should();

describe('Schedule Suite', () => {
  it('orderBySchedule function should be a function', () => {
    orderBySchedule.should.be.a('function');
  });

  it('Schedule stores should be ordered, closed stores should be on the end of an array', () => {
    const sortedStores = orderBySchedule(stores);
    sortedStores[0].should.have.property('is_closed').and.to.be.equals(false);
    sortedStores[sortedStores.length - 1].should.have.property('is_closed').and.to.be.equals(true);
  });
});
