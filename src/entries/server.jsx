import React from 'react';
import { theme } from '@/theme';
import { StaticRouter } from 'react-router';
import Root from './universal';

export const staticApp = (client, path) => (
  <StaticRouter location={path}>
    <Root theme={theme} client={client} />
  </StaticRouter>
);
