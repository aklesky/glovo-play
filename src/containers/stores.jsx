import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Query } from 'react-apollo';
import query from '@/queries/stores.graphql';
import { Grid, Row, Column } from '@/components/Grid';
import { Stores } from '@/components/Stores';
import { Header } from '@/components/Header';

const StoreContainer = props => {
  const {
    match: { params }
  } = props;
  return (
    <Stores>
      <Grid fullHeight>
        <Row>
          <Query
            query={query}
            variables={{
              category: params.store
            }}
          >
            {({ data, loading }) => {
              if (loading) {
                return '...Loading';
              }
              return data.Stores.map(store => {
                return (
                  <Column key={store.id} xs={12} sm={12} md={4} lg={3}>
                    <Header>{store.name}</Header>
                  </Column>
                );
              });
            }}
          </Query>
        </Row>
      </Grid>
    </Stores>
  );
};

StoreContainer.propTypes = {
  match: PropTypes.shape({}).isRequired
};

export default withRouter(StoreContainer);
