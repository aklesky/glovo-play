import React from 'react';
import { theme } from '@/theme';
import Root from './universal';

export const staticApp = client => <Root theme={theme} client={client} />;
