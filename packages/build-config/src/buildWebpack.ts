import webpack from "webpack";
import path from "node:path";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/types";

export const buildWebpack = (options: BuildOptions): webpack.Configuration => {
  const isProd = options.mode === "production";
  const isDev = options.mode === "development";

  return {
    mode: options.mode,
    entry: options.paths.entry,
    //entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      //path: path.resolve(__dirname, 'build'),
      path: options.paths.output,
      filename: "[name].[contenthash].js",
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
    devServer: isDev ? buildDevServer(options) : undefined,
  };
};
