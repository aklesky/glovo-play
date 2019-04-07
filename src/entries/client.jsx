import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Universal from './universal';
import { theme } from '@/theme';
import { client } from '@/utils/apollo';

const renderApp = apollo => {
  const Root = (
    <BrowserRouter>
      <Universal client={apollo} theme={theme}/>
    </BrowserRouter>
  );

  if (process.env.NODE_ENV === 'production') {
    ReactDOM.hydrate(Root, document.getElementById('root'));
  } else {
    ReactDOM.render(Root, document.getElementById('root'));
  }
};

renderApp(client(process.browser));

if (module.hot) {
  module.hot.accept('@/app', () => {
    renderApp(client(process.browser));
  });
}
