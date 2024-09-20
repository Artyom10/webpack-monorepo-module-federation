import path from "node:path";
import {
  buildWebpack,
  BuildMode,
  BuildPaths,
  BuildPlatform,
} from "@packages/build-config";
import webpack from "webpack";
import packageJson from "./package.json";
import { DEFAULT_ADMIN_REMOTE_URL, DEFAULT_GALLERY_REMOTE_URL } from '@packages/shared/src/constants/index'

type Env = {
  mode: BuildMode;
  port: number;
  analyzer?: boolean;
  platform?: BuildPlatform;
  GALLERY_REMOTE_URL?: string;
  ADMIN_REMOTE_URL?: string;
};

const webpackConfig = (env: Env) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: path.resolve(__dirname, "build"),
    html: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),
    public: path.resolve(__dirname, "public"),
  };

  const GALLERY_REMOTE_URL = env.GALLERY_REMOTE_URL ?? DEFAULT_GALLERY_REMOTE_URL;
  const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? DEFAULT_ADMIN_REMOTE_URL;

  const config = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? "development",
    paths,
    analyzer: env.analyzer,
    platform: env.platform,
  });

  config.plugins?.push(
    new webpack.container.ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        gallery: `gallery@${GALLERY_REMOTE_URL}/remoteEntry.js`,
        admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`,
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true,
          requiredVersion: packageJson.dependencies["react"],
        },
        "react-router-dom": {
          eager: true,
          requiredVersion: packageJson.dependencies["react-router-dom"],
        },
        "react-dom": {
          eager: true,
          requiredVersion: packageJson.dependencies["react-dom"],
        },
      },
    })
  );

  return config;
};

export default webpackConfig;
