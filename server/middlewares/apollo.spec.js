import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server';
import { setupServer } from '../koa';
import { logger } from '../utils/logger';

describe('Initial Apollo Server Suite', () => {
  let server = null;
  let instance = null;

  before(() => {
    const { app, apollo } = setupServer();

    server = app.listen(3200, () => {
      logger.info(`server is runninng on 3200`);
    });
    instance = apollo;
  });
  after(() => {
    server.close();
  });

  it('Apollo Query: Categories Should fetch a list of categories', async () => {
    const { query } = createTestClient(instance);
    const response = await query({
      query: gql`
        {
          Categories {
            id
            label
          }
        }
      `
    });
    response.should.have
      .property('data')
      .and.to.be.an('object')
      .that.has.property('Categories')
      .that.length.greaterThan(0)
      .and.all.have.property('id');
  });
  it('Apollo Query: Stores Should fetch data for gifts and contains properties id and name', async () => {
    const { query } = createTestClient(instance);
    const response = await query({
      query: gql`
        query getStores($category: String) {
          Stores(category: $category) {
            id
            name
          }
        }
      `,
      variables: {
        category: 'gifts'
      }
    });
    response.should.have
      .property('data')
      .and.to.be.an('object')
      .that.has.property('Stores')
      .that.length.greaterThan(0)
      .and.all.have.property('id')
      .and.all.have.property('name');
  });
});
