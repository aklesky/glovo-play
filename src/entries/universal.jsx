
import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import App from '@/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@/theme/globalStyles';

const Root = (props) => {
  const { theme, client } = props;
  return (
  <ThemeProvider theme={theme}>
    <main>
      <GlobalStyles />
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </main>
  </ThemeProvider>
  );
};

Root.propTypes = {
  theme: PropTypes.shape({}).isRequired,
  client: PropTypes.shape({}).isRequired,
}

export default React.memo(Root);
