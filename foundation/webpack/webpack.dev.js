/* eslint-disable flowtype/require-valid-file-annotation */

import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// PostCSS plugins
import cssnext from 'postcss-cssnext';
import postcssNested from 'postcss-nested';
import postcssReporter from 'postcss-reporter';

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
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
      templateContent: templateContent(), // eslint-disable-line no-use-before-define
    }),
  ],

  // Load the CSS in a style tag in development
  cssLoaders: 'style-loader!css-loader?localIdentName=[path][local]&modules&importLoaders=1&sourceMap!postcss-loader',

  // Process the CSS with PostCSS
  postcssPlugins: [
    cssnext({ // Allow future CSS features to be used, also auto-prefixes the CSS...
      browsers: ['last 2 versions', 'IE > 10'], // ...based on this browser list
    }),
    postcssReporter({ // Posts messages from plugins to the terminal
      clearMessages: true,
    }),
    postcssNested(),
  ],

  // Tell babel that we want to hot-reload
  babelQuery: {
    // TODO fix hmre (probably wait until hot reloader v3 is out)
    // presets: ['react-hmre'],
    // Load the babel relay plugin and initialize it with the GraphQL schema
    plugins: [path.resolve(process.cwd(), 'foundation', 'relay', 'babelRelayPlugin')],
  },

  // Emit a source map for easier debugging
  devtool: 'cheap-module-eval-source-map',
});

function templateContent() {
  return fs.readFileSync(
    path.resolve(process.cwd(), 'app/index.html')
  ).toString();
}
