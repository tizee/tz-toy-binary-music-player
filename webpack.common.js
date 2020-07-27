const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    app: "./src/index.tsx",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", "scss", "css", "sass"],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          devMode ? "style-loader" : MiniCSSExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: devMode,
            },
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              // Dart sass
              sassOptions: {
                fiber: require("fibers"),
              },
              sourceMap: devMode,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: "url-loader",
        options: {
          limit: 8192,
        },
      },
    ],
  },
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new MiniCSSExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css",
    }),
    new HtmlWebpackPlugin({
      title: "React Binary Music Player",
      inject: "body",
      template: path.resolve(__dirname, "./src/index.html"),
    }),
  ],
  output: {
    filename: "bundle-[hash].js",
    path: path.resolve(__dirname, "dist"),
  },
};
