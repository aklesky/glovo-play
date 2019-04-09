import React, { useState, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { withTheme } from 'styled-components';
import { Query } from 'react-apollo';
import { Subject } from 'rxjs';
import { Helmet } from 'react-helmet-async';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import i18n from 'i18n/en.json';
import query from '@/queries/category.graphql';
import { Grid, Row, Column } from '@/components/Grid';
import { Stores } from '@/components/Stores';
import { Title } from '@/components/Title';
import Search from '@/components/Search';
import Category from '@/containers/category';
import Store from '@/containers/store';

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
    <>
      <Stores>
        <Grid fullHeight fullWidth>
          <Query
            query={query}
            variables={{
              category: params.store
            }}
          >
            {({ data, loading, refetch }) => {
              if (loading || !(data.Category && data.Category.current)) {
                return '...Loading';
              }

              return (
                <>
                  <Helmet>
                    <meta charSet="utf-8" />
                    <title>
                      {`${i18n.name}: ${data.Category.current.label}`}
                    </title>
                    <meta
                      name="description"
                      content={`${i18n.category}: ${data.Category.current.label}`}
                    />
                  </Helmet>
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
                    <Column xs={12} sm={12} md={12} lg={12}>
                      <Category
                        data={data.Category.current}
                        fullWidth
                        marginVertical={props.theme.metrics.padding}
                        marginHorizontal={props.theme.metrics.padding}
                      >
                        <Title>{data.Category.current.label}</Title>
                      </Category>
                    </Column>
                  </Row>
                  <Row>
                    {data.Category.stores.map(store => {
                      return (
                        <Column key={store.id} xs={12} sm={12} md={4} lg={3}>
                          <Store data={store} />
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
    </>
  );
};

StoreContainer.propTypes = {
  match: PropTypes.shape({}).isRequired,
  theme: PropTypes.shape({
    metrics: PropTypes.shape({
      margin: PropTypes.number,
      padding: PropTypes.number
    })
  }).isRequired
};

export default withRouter(withTheme(StoreContainer));
