import React, { useEffect, createRef } from 'react';
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
import Tags from '@/containers/tags';
import Store from '@/containers/store';
import Back from '@/components/BackLink';

const StoreContainer = props => {
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
      });

    subject.next(event.target.value.trim());
  };

  const onReset = refetch => () => {
    refetch({
      tag: null
    });
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
            {({ data, loading, refetch, variables }) => {
              if (loading || !(data.Category && data.Category.current)) {
                return '...Loading';
              }

              const { current, stores } = data.Category;
              return (
                <>
                  <Helmet>
                    <meta charSet="utf-8" />
                    <title>{`${i18n.name}: ${current.label}`}</title>
                    <meta name="description" content={`${i18n.category}: ${current.label}`} />
                  </Helmet>
                  <Row fullWidth alignItems="center">
                    <Column xs={2} sm={2} md={2} lg={2}>
                      <Back ariaLabel={i18n.back} />
                    </Column>
                    <Column xs={10} sm={10} md={10} lg={10}>
                      <Search
                        placeholder={i18n.filterByTag}
                        forwardRef={ref}
                        onKeyUp={onKeyUp(refetch)}
                        value={variables.tag}
                      />
                    </Column>
                  </Row>
                  {variables.tag && <Tags label={variables.tag} onClick={onReset(refetch)} />}
                  <Row>
                    <Column xs={12} sm={12} md={12} lg={12}>
                      <Category
                        data={current}
                        fullWidth
                        marginVertical={props.theme.metrics.padding}
                        marginHorizontal={props.theme.metrics.padding}
                      >
                        <Title>{current.label}</Title>
                      </Category>
                    </Column>
                  </Row>
                  <Row>
                    {stores.map(store => {
                      return (
                        <Column key={store.id} xs={12} sm={12} md={4} lg={3}>
                          <Store data={store} refetch={refetch} />
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
