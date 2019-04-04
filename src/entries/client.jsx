import React from 'react';
import ReactDOM from 'react-dom';
import Root from './universal';
import { theme } from '@/theme';
import { client } from '@/utils/apollo';



const renderApp = apollo => {
  if (process.env.NODE_ENV === 'production') {
    ReactDOM.hydrate(<Root client={apollo} theme={theme} />, document.getElementById('root'));
  } else {
    ReactDOM.render(<Root client={apollo} theme={theme} />, document.getElementById('root'));
  }
};

renderApp(client(process.browser));

if (module.hot) {
  module.hot.accept('@/app', () => {
    renderApp(client(process.browser));
  });
}
