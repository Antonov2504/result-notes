import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from "../types";

export const buildLoaders = ({ mode }: BuildOptions): ModuleOptions['rules'] => {
  const isDev = mode === 'development';

  const cssLoader = {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader'],
  };

  const svgrLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  };

  const assetsLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  const fontsLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
  };

  const cssLoaderWithModules = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
      },
    },
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      cssLoaderWithModules,
      "sass-loader",
    ],
  };

  const babelLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          ['@babel/preset-env', { "targets": { "esmodules": true } }],
          ["@babel/preset-react", { "runtime": isDev ? "automatic" : "classic" }],
          "@babel/preset-typescript"
        ],
        "plugins": [
          ["@babel/plugin-transform-modules-commonjs"],
          ["@babel/plugin-transform-object-assign"],
          ["babel-plugin-styled-components"]
        ],
      },
    },
  };

  return [
    cssLoader,
    scssLoader,
    assetsLoader,
    fontsLoader,
    svgrLoader,
    babelLoader,
  ];
};
