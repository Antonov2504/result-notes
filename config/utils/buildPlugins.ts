import { Configuration, DefinePlugin, ProgressPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import path from 'path';
import { InjectManifest } from 'workbox-webpack-plugin';
import { BuildOptions } from '../types';

export const buildPlugins = ({ mode, paths, withAnalyzer, platform }: BuildOptions) => {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: path.resolve(paths.public, 'favicon.ico'),
      publicPath: '/',
    }),
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
      __ENV__: JSON.stringify(mode),
    }),
    new InjectManifest({
      swSrc: './src/sw.ts',
      swDest: 'sw.js',
    }),
    new CopyPlugin({
      patterns: [
        { from: './manifest.json', to: '' },
        { from: './src/assets/images/bg-errors.jpg', to: '' },
        { from: './src/assets/images/bg-login.jpg', to: '' },
        { from: './src/assets/icons/notes_48x48.png' },
        { from: './src/assets/icons/notes_72x72.png' },
        { from: './src/assets/icons/notes_96x96.png' },
        { from: './src/assets/icons/notes_128x128.png' },
        { from: './src/assets/icons/notes_144x144.png', to: '' },
        { from: './src/assets/icons/notes_152x152.png' },
        { from: './src/assets/icons/notes_192x192.png' },
        { from: './src/assets/icons/notes_284x284.png' },
        { from: './src/assets/icons/notes_512x512.png' },
      ],
    }),
  ];

  if (isDev) {
    plugins.push(new ProgressPlugin());
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      })
    );
  }

  if (withAnalyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
};
