import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@/theme/globalStyles';
import { Switch, Route } from 'react-router';
import Categories from '@/containers/categories';
import Stores from '@/containers/stores';

const Root = props => {
  const { theme, client } = props;
  return (
    <ThemeProvider theme={theme}>
      <main className="test">
        <GlobalStyles />
        <ApolloProvider client={client}>
          <Switch>
            <Route exact path="/" component={Categories} />
            <Route path="/:store" component={Stores}/>
          </Switch>
        </ApolloProvider>
      </main>
    </ThemeProvider>
  );
};

Root.propTypes = {
  theme: PropTypes.shape({}).isRequired,
  client: PropTypes.shape({}).isRequired,
};

export default React.memo(Root);
