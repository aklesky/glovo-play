import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import GlobalStyles from './theme/globalStyles';

const App = () => (
  <ThemeProvider theme={theme}>
    <>
    <GlobalStyles />
    <div>initial setup</div>
    </>
  </ThemeProvider>
);
App.displayName = 'App';

export default App;
