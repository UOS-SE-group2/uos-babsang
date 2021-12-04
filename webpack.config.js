const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const BASE = "./src/client/js/";
module.exports = {
  entry: {
      main: BASE + "main.js",
//      home: BASE + "home.js"
  },
  plugins: [new MiniCssExtractPlugin({
      filename: "css/styles.css",
  })],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true
  },
  mode:"development",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [['@babel/preset-env', {targets:"defaults"}]]
          }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};