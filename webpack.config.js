const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env = {}) => ({
  mode: env.prod ? 'production' : 'development',
  devtool: env.prod ? 'source-map' : 'cheap-module-eval-source-map',
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      // this isn't technically needed, since the default `vue` entry for bundlers
      // is a simple `export * from '@vue/runtime-dom`. However having this
      // extra re-export somehow causes webpack to always invalidate the module
      // on the first HMR update and causes the page to reload.
      'vue': '@vue/runtime-dom'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.png$/,
        use: {
          loader: 'url-loader',
          options: { limit: 8192 }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: !env.prod }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
                require('cssnano')({
                  preset: 'default',
                })
              ],
            },
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { 
          from: 'index.html', 
          to: 'index.html', 
          transform(content) {
            if (!env.prod) return content;

            return content.toString()
              .replace('main.css', 'main.css?ts=' + Date.now())
              .replace('main.js', 'main.js?ts=' + Date.now());
          } 
        },
        { 
          from: 'qrcode-placeholder.svg', 
          to: 'qrcode-placeholder.svg'
        },
        { 
          from: 'favicon.svg', 
          to: 'favicon.svg'
        }
      ],
      options: {
        concurrency: 100,
      },
      
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  devServer: {
    inline: true,
    hot: true,
    stats: 'minimal',
    contentBase: __dirname,
    overlay: true
  }
})
