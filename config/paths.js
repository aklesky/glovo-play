import { join } from 'path';
import { isProduction } from './env';

export const root = process.cwd();

export const publicPath = '/';

export const source = join(root, 'src');
export const webpackConfig = join(root, 'webpack.config.babel.js');

export const nodeModules = join(root, 'node_modules');
export const destination = join(root, 'dist');
export const distClient = join(destination, 'public');
export const distJavascript = join(distClient, 'assets', 'js');
export const distAssets = join(distClient, 'assets');
export const distServer = join(destination, 'server');

export const publicDirectory = join(root, 'public');
export const libDirectory = join(root, 'lib');
export const staticDirectory = join(root, 'static');
export const robots = join(staticDirectory, 'robots.txt');
export const mediaDirectory = join(staticDirectory, 'img');
export const i18n = join(root, 'i18n');

export const template = join(publicDirectory, isProduction ? 'prod.html' : 'dev.html');

export const entries = join(source, 'entries');

export const publicEntry = join(entries, 'client.jsx');
export const servercEntry = join(entries, 'server.jsx');

export const server = join(root, 'server');
export const data = join(server, 'data');

export const app = join(server, 'server.js');
export const appBundle = join(distClient, 'app.html');

export const logsDirectory = join(root, 'logs');
export const log = join(logsDirectory, 'info.log');
export const error = join(logsDirectory, 'error.log');

export const workBoxConfig = join(
  root,
  'lib',
  isProduction ? 'sw-core.production.js' : 'sw-core.dev.js'
);
export const swCore = join(distAssets, 'sw-core.js');
export const bundleImage = join(staticDirectory, 'media', 'bundle.png');
