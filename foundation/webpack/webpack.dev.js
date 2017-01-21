import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = require('./webpack.base')({
  // Add hot reloading in development
  entry: [
    'webpack-hot-middleware/client',
    path.join(process.cwd(), 'app/app.js'), // Start with js/app.js
  ],

  // Don't use hashes in dev mode for better performance
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  // Add development plugins
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
      templateContent: templateContent(), // eslint-disable-line no-use-before-define
    }),
  ],

  // Load the CSS in a style tag in development
  cssLoaders: [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: {
        localIdentName: '[path][local]',
        modules: true,
        importLoaders: true,
        sourceMap: true,
      },
    },
    { loader: 'postcss-loader' },
  ],

  // Emit a source map for easier debugging
  devtool: 'cheap-module-eval-source-map',
});

function templateContent() {
  return fs.readFileSync(
    path.resolve(process.cwd(), 'app/index.html'),
  ).toString();
}
