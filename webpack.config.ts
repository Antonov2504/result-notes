import path from 'path';
import { BuildMode, BuildPaths, BuildPlatform, buildWebpack } from './config';

interface EnvVariables {
  mode?: BuildMode;
  port?: number;
  withAnalyzer?: boolean;
  platform?: BuildPlatform;
  REMOTE_URL_ADMIN?: string;
  REMOTE_URL_SHOP?: string;
};

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    output: path.resolve(__dirname, 'build'),
    src: path.resolve(__dirname, 'src'),
    public: path.resolve(__dirname, 'public'),
  };

  const config = buildWebpack({
    mode: env.mode ?? 'development',
    port: env.port ?? 3000,
    paths,
    withAnalyzer: env.withAnalyzer,
    platform: env.platform ?? 'desktop',
  });

  return config;
};
