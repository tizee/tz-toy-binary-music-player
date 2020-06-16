const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.tsx",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "index.html",
      inject: "body",
    }),
  ],
  output: {
    filename: "[name]-[hash:8].js",
    path: path.resolve(__dirname, "dist"),
  },
  externarls: {},
};

// module.exports = {
//   mode: "production",
//   devtool: "source-map",
//   resolve: {
//     extensions: [".ts", ".tsx"],
//   },

//   module: {
//     rules: [
//       {
//         test: /\.ts(x?)$/,
//         exclude: /node_modules/,
//         use: [
//           {
//             loader: "ts-loader",
//           },
//         ],
//       },
//       {
//         enforce: "pre",
//         test: /\.ts(x?)$/,
//         exclude: /node_modules/,
//         loader: "source-map-loader",
//       },
//     ],
//   },
// };
