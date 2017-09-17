import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/src/index.html',
  filename: 'index.html',
  inject: 'body'
});

// const debug = process.env.NODE_ENV !== 'production';
// ./client/src/js/index.js
// ./client/src/js/app.jsx
module.exports = {
  entry: ['./client/src/js/index.jsx'],
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'bundle.js',
    publicPath: ''
  },
  externals: {
    Materialize: 'Materialize',
    jquery: 'jQuery',
    materialize: 'materialize'
  },
  module: {
    loaders: [
      // > JS
      { test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // > JSX
      { test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      { test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'stage-2']
        }
      },
      // > CSS / SCSS
      { test: /\.(css|scss)?$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      // > MATERIALIZE LOADERS
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ] // loaders
  }, // modules
  // > Module Folders (packages and extensions)
  resolve: {
    modules: ['node_modules', 'client/src'],
    extensions: ['.js', '.jsx', '.json', '.css', '.scss']
  }, // modules
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Hammer: 'hammerjs/hammer',
      createDayLabel: 'jquery',
      createWeekdayLabel: 'jquery',
      activateOption: 'jquery',
      leftPosition: 'jquery'
    })
  ], // plugins
  devServer: {
    proxy: {
      '/api/v1': 'http://localhost:7000'
    },
    hot: true,
    historyApiFallback: true
  }, // devServer
  node: {
    net: 'empty',
    dns: 'empty'
  }
};
