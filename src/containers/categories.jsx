import React from 'react';
import { Query } from 'react-apollo';
import query from '@/queries/categories.graphql';
import { LinkTo } from '@/components/Link';
import { Category } from '@/components/Category';
import { Grid, Row, Column } from '@/components/Grid';

const Categories = () => (
  <Grid fullHeight>
    <Row direction='row' fullHeight>
      <Query query={query}>
        {({ data, loading }) => {
          if (loading) {
            return '...Loading';
          }
          return data.Categories.map(item => {
            return (
              <Column key={item.id} lg={3} md={3} sm={12} xs={12} fullWidth>
                <Category >
                  <LinkTo to={`/${item.name}`}>{item.label}</LinkTo>
                </Category>
              </Column>
            );
          });
        }}
      </Query>
    </Row>
  </Grid>
);

export default Categories;
