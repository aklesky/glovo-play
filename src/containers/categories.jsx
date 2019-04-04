import React from 'react';
import { Query } from 'react-apollo';
import query from '@/queries/categories.graphql';

const Categories = () => (
  <Query query={query}>
    {({ data }) => {
      return (JSON.stringify(data, null, 4));
    }}
  </Query>
);

export default React.memo(Categories);
