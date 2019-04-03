import chai from 'chai';
import things from 'chai-things';
import { getJsonData } from './data';

chai.should();
chai.use(things);

describe('Json Data Suite', () => {
  it('getJsonData should not be undefined.', () => {
    getJsonData.should.be.a('function');
  });

  it('getJsonData should return false if file extension is not defined.', () => {
    getJsonData('categories').should.be.false;
  });

  it('getJsonData should return a json object from file', () => {
    getJsonData('categories.json').should.be.an('object');
  });

  it('getJsonData should return an object which contains property categories and to be array of objects containing property id and label', () => {
    getJsonData('categories.json')
      .should.to.have.property('categories')
      .to.be.an('array')
      .that.all.have.property('id')
      .and.all.have.property('label');
  });
});
