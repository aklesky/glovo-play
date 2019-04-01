import { resolve } from 'path';
import { isProduction } from './env';

export const root = process.cwd();

export const publicPath = '/';

export const source = resolve(root, 'src');
export const nodeModules = resolve(root, 'node_modules');
export const destination = resolve(root, 'dist');
export const distClient = resolve(destination, 'public');
export const distServer = resolve(destination, 'server');

export const publicDirectory = resolve(root, 'public');
export const staticDirectory = resolve(root, 'static');
export const mediaDirectory = resolve(staticDirectory, 'img');

export const template = resolve(publicDirectory, 'index.html');

export const entries = resolve(source, 'entries');

export const publicEntry = resolve(entries, 'client.js');
export const servercEntry = resolve(entries, 'server.js');

export const server = resolve(root, 'server');

export const app = isProduction ? resolve(server, 'production.js') : resolve(server, 'dev.js');
