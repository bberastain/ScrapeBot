const path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, "client/src", "index.jsx"),
  output: {
    filename: 'bundle.js',
    path:path.resolve(__dirname, "client/dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ["@babel/plugin-transform-runtime",
              {options: new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)}
            ]
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ]
  },
}