import path from 'node:path'
import {buildWebpack, BuildMode, BuildPaths, BuildPlatform} from '@packages/build-config'
import packageJson from './package.json'
import webpack from 'webpack'

type Env = {
  mode: BuildMode
  port: number
  analyzer?: boolean
  platform?: BuildPlatform
}

const webpackConfig = (env: Env) => {

  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, 'src'),
    public: path.resolve(__dirname, 'public')
  }

    const config = buildWebpack({
      port: env.port ?? 3002,
      mode: env.mode ?? 'development',
      paths,
      analyzer: env.analyzer,
      platform: env.platform
    })

    config.plugins?.push(new webpack.container.ModuleFederationPlugin({
      name: 'admin',
      filename: 'remoteEntry.js',
      exposes: {
        './Router': './src/router/Router.tsx',
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true,
          requiredVersion: packageJson.dependencies['react']
        },
        'react-router-dom': {
          eager: true,
          requiredVersion: packageJson.dependencies['react-router-dom']
        },
        'react-dom': {
          eager: true,
          requiredVersion: packageJson.dependencies['react-dom']
        },
      }
    }))

    return config
}

export default webpackConfig