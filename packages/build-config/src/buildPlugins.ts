import webpack, { Configuration, DefinePlugin } from "webpack";
import path from "node:path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { BuildOptions } from "./types/types";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from 'copy-webpack-plugin'

export const buildPlugins = (
  options: BuildOptions
): Configuration["plugins"] => {
  const isProd = options.mode === "production";
  const isDev = options.mode === "development";

  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      //template: path.resolve(__dirname, "public", "index.html"),
      template: options.paths.html,
      favicon: path.resolve(options.paths.public, 'icon.ico'),
      publicPath: '/',
    }),
    new DefinePlugin({
      GLOBAL_PLATFORM: JSON.stringify(options.platform)
    }),
    //new ForkTsCheckerWebpackPlugin()
  ];

  if (isDev) {
    plugins.push(new webpack.ProgressPlugin());
    plugins.push(new ReactRefreshWebpackPlugin())
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      })
    );
    plugins.push(new CopyPlugin({
      patterns: [
        { from: path.resolve(options.paths.public, 'data'), to: path.resolve(options.paths.output, 'data') }
      ],
    }))
  }

  if (options.analyzer) {
    plugins.push(new BundleAnalyzerPlugin())
  }

  return plugins;
};
