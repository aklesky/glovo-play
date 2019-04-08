import React, { useState, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Query } from 'react-apollo';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import i18n from 'i18n/en.json';
import query from '@/queries/stores.graphql';
import { Grid, Row, Column } from '@/components/Grid';
import { Stores } from '@/components/Stores';
import { Header } from '@/components/Header';
import Search from '@/components/Search';

const StoreContainer = props => {
  const [input, setInput] = useState('');
  const ref = createRef();
  const subject = new Subject();
  useEffect(() => {
    return function cleanup() {
      subject.unsubscribe();
    };
  });
  const onKeyUp = refetch => event => {
    subject
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(tag => {
        refetch({ tag });
        setInput(tag);
      });

    subject.next(event.target.value.trim());
  };

  const {
    match: { params }
  } = props;
  return (
    <Stores>
      <Grid fullHeight fullWidth>
        <Query
          query={query}
          variables={{
            category: params.store
          }}
        >
          {({ data, loading, refetch }) => {
            if (loading) {
              return '...Loading';
            }
            return (
              <>
                <Row fullWidth>
                  <Column xs={12} sm={12} md={12} lg={12}>
                    <Search
                      placeholder={i18n.filterByTag}
                      forwardRef={ref}
                      onKeyUp={onKeyUp(refetch)}
                      value={input}
                    />
                  </Column>
                </Row>
                <Row>
                  {data.Stores.map(store => {
                    return (
                      <Column key={store.id} xs={12} sm={12} md={4} lg={3}>
                        <div>
                          <Header>{store.name}</Header>
                          <p>{store.description}</p>
                          <p>{store.open}</p>
                        </div>
                      </Column>
                    );
                  })}
                </Row>
              </>
            );
          }}
        </Query>
      </Grid>
    </Stores>
  );
};

StoreContainer.propTypes = {
  match: PropTypes.shape({}).isRequired
};

export default withRouter(StoreContainer);
