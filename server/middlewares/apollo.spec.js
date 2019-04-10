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
  it('Apollo Query: Category Should fetch data for gifts and contains properties id, name and is_closed', async () => {
    const { query } = createTestClient(instance);
    const response = await query({
      query: gql`
        query getStores($category: String!) {
          Category(category: $category) {
            stores {
              id
              name
              is_closed
            }
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
      .that.has.property('Category')
      .that.has.property('stores')
      .that.length.greaterThan(0)
      .and.all.have.property('id')
      .and.all.have.property('name')
      .and.all.have.property('is_closed');
  });
  it('Apollo Query: Category Should have one store for restaurants and by tag vegan', async () => {
    const { query } = createTestClient(instance);
    const response = await query({
      query: gql`
        query getStores($category: String!, $tag: String) {
          Category(category: $category, tag: $tag) {
            current {
              name
              label
              active
            }
            stores {
              id
              name
              is_closed
              open
            }
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
      .that.has.property('Category')
      .that.has.property('stores')
      .that.length(1)
      .and.all.have.property('id')
      .and.all.have.property('name')
      .and.all.have.property('is_closed');
  });
});
