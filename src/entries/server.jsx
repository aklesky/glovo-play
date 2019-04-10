import React from 'react';
import { theme } from '@/theme';
import { StaticRouter } from 'react-router';
import Universal from './universal';

export const staticApp = (client, path) => (
  <StaticRouter location={path}>
    <Universal theme={theme} client={client} />
  </StaticRouter>
);
