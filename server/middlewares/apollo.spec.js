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
            active
          }
        }
      `
    });
    response.should.have
      .property('data')
      .and.to.be.an('object')
      .that.has.property('Categories')
      .that.length.greaterThan(0)
      .and.all.have.property('id')
      .and.all.have.property('active');
  });
  it('Apollo Query: Stores Should fetch data for gifts and contains properties id, name and is_closed', async () => {
    const { query } = createTestClient(instance);
    const response = await query({
      query: gql`
        query getStores($category: String!) {
          Stores(category: $category) {
            id
            name
            is_closed
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
      .and.all.have.property('name')
      .and.all.have.property('is_closed');
  });
  it('Apollo Query: Stores Should have one store for restaurants and by tag vegan', async () => {
    const { query } = createTestClient(instance);
    const response = await query({
      query: gql`
        query getStores($category: String!, $tag: String) {
          Stores(category: $category, tag: $tag) {
            id
            name
            is_closed
            open
          }
        }
      `,
      variables: {
        category: 'restaurants',
        tag: 'vegan'
      }
    });
    response.should.have
      .property('data')
      .and.to.be.an('object')
      .that.has.property('Stores')
      .that.length(1)
      .and.all.have.property('id')
      .and.all.have.property('name')
      .and.all.have.property('is_closed');
  });
});
