const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const {
  loadCSS,
  loadStaticFiles,
  babelLoader,
  devServer,
} = require('./wepack.parts');

const commonConfig = merge([
  {
    entry: ['./src'],
    output: {
      filename: 'js/[name]-[chunkhash].js',
      sourceMapFilename: 'sourceMap/[file].map',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        favicon: './src/favicon.ico',
      }),
      new CleanWebpackPlugin(),
    ],
    devtool: 'cheap-source-map',
  },
  loadCSS(),
  loadStaticFiles(),
  babelLoader(),
]);

const productionConfig = merge([]);

const developmentConfig = merge([{ mode: 'development' }, devServer()]);

module.exports = (env, argv) => {
  const { mode } = argv;
  switch (mode || 'development') {
    case 'production':
      return merge(commonConfig, productionConfig, { mode });
    case 'development':
      return merge(commonConfig, developmentConfig, { mode });
    default:
      throw new Error(`Trying to use an unknown mode, ${mode}`);
  }
};
