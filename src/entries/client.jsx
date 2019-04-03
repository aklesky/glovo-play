import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/app';
import i18n from 'i18n/en.json';

const renderApp = () => {
  if (process.env.NODE_ENV === 'production') {
    ReactDOM.hydrate(<App i18n={i18n} />, document.getElementById('root'));
  } else {
    ReactDOM.render(<App i18n={i18n} />, document.getElementById('root'));
  }
};

renderApp();

if (module.hot) {
  module.hot.accept('@/app', () => {
    renderApp();
  });
}
