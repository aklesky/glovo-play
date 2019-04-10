import ManifestPlugin from 'webpack-manifest-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import WorkboxPlugin  from 'workbox-webpack-plugin';
import en from '../../i18n/en.json';
import { isProduction } from '../env';
import { bundleImage } from '../paths';
import { colors } from '../../src/theme/colors';
import { bundle } from '../bundle';
import { workboxBundle, workboxRuntimeCashing } from '../workbox';
import { files } from '../files';

export const progressive = {
  mode: isProduction ? 'production' : 'development',
  plugins: [
    new ManifestPlugin({
      fileName: bundle.assetsManifest,
      filter: (file) => {
        return !files.filter.test(file.name);
      },
      map: (file) => {
        if (file && file.name.endsWith('sw.js')) {
          return {
            ...file,
            path: '/sw.js',
            name: 'sw.js'
          };
        }
        return file;
      }
    }),
    new WebpackPwaManifest({
      name: en.name,
      filename: bundle.manifest,
      short_name: en.short_name,
      description: en.description,
      background_color: colors.background,
      theme_color: colors.primary,
      inject: true,
      ios: {
        'apple-mobile-web-app-title': en.name,
        'apple-mobile-web-app-status-bar-style': 'black'
      },
      crossorigin: 'use-credentials',
      icons: [
        {
          src: bundleImage,
          sizes: [96, 128, 192, 256, 384, 512],
          ios: true,
          destination: bundle.media.destination,
        },
        {
          src: bundleImage,
          size: '1024x1024',
          ios: true,
          destination: bundle.media.destination,
        }
      ]
    }),
    new WorkboxPlugin.GenerateSW({
      swDest: bundle.serviceWorker,
      precacheManifestFilename: bundle.precacheManifest,
      clientsClaim: true,
      skipWaiting: true,
      exclude: workboxBundle.exclude,
      runtimeCaching: workboxRuntimeCashing,
      importScripts: [bundle.swCore]
    })
  ]
};
