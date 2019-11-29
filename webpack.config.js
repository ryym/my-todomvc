const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');

module.exports = {
  mode: 'development',

  entry: SRC,

  output: {
    path: path.join(ROOT, 'dist'),
    filename: '[name].js',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  devServer: {
    port: '8000',
  },

  module: {
    rules: [
      {
        test: /\.tsx?/,
        include: SRC,
        use: [{ loader: 'ts-loader' }],
      },
      {
        test: /\.css/,
        include: SRC,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
};
