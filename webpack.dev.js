const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, "dist"),
        port: "8000",
    },
    // plugins: [
    //     new BundleAnalyzerPlugin({
    //         analyzerMode: "server",
    //         analyzerHost: "127.0.0.1",
    //         analyzerPort: "9527",
    //     }),
    // ],
});
