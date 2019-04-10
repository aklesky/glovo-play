import React from 'react';
import { Query } from 'react-apollo';
import query from '@/queries/categories.graphql';
import { LinkTo } from '@/components/Link';
import Category from '@/containers/category';
import { Grid, Row, Column } from '@/components/Grid';
import { Subtitle } from '@/components/Subtitle';

const Categories = () => (
  <Grid fullHeight>
    <Row direction="row">
      <Query query={query}>
        {({ data, loading }) => {
          if (loading) {
            return '...Loading';
          }
          return data.Categories.map(item => {
            return (
              <Column key={item.id} lg={3} md={4} sm={12} xs={12}>
                <>
                  <LinkTo
                    aria-label={item.label}
                    active={item.active && item.active ? 1 : 0}
                    to={`/${item.name}`}
                  >
                    <Category data={item}>
                      <Subtitle>{item.label}</Subtitle>
                    </Category>
                  </LinkTo>
                </>
              </Column>
            );
          });
        }}
      </Query>
    </Row>
  </Grid>
);

export default Categories;
