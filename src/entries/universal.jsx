import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@/theme/globalStyles';
import { Switch, Route } from 'react-router';
import Categories from '@/containers/categories';
import Stores from '@/containers/stores';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { name, description } from 'i18n/en.json';

import { helmetContext } from '@/helmet';

const Root = props => {
  const { theme, client } = props;
  return (
    <HelmetProvider context={helmetContext}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{name}</title>
        <meta name="description" content={description} />
      </Helmet>
      <ThemeProvider theme={theme}>
        <main className="test">
          <GlobalStyles />
          <ApolloProvider client={client}>
            <Switch>
              <Route exact path="/" component={Categories} />
              <Route path="/:store" component={Stores} />
            </Switch>
          </ApolloProvider>
        </main>
      </ThemeProvider>
    </HelmetProvider>
  );
};

Root.propTypes = {
  theme: PropTypes.shape({}).isRequired,
  client: PropTypes.shape({}).isRequired
};

export default React.memo(Root);
