const Path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  mode: "development", // 开发模式
  entry: "./src/index.js",
  output: {
    // 主JavaScript文件命名模式
    // [name]: 入口名称，默认为main
    // [contenthash:8]: 基于内容生成的8位hash值，内容改变时hash值改变
    // .js: 文件扩展名
    filename: "[name].[contenthash:8].js",

    // 代码分割后的chunk文件命名模式
    chunkFilename: "chunk.[name].[contenthash:8].js",

    // 图片、字体等资源的命名模式
    assetModuleFilename: "assets/[name].[hash:8][ext]",

    path: Path.resolve(__dirname, "dist"),
  },
  devServer: {
    hot: true,
    port: 8083,
    open: true,
    static: {
      directory: Path.join(__dirname, "public"), // 静态资源所在目录
      publicPath: "/", // 访问静态资源的路径前缀
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],

            filename: "babel.js",
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: "asset/resource",
        generator: {
          // 为图片资源单独设置输出路径和文件名
          filename: "images/[name].[hash:8][ext]",
        },
      },
      // 为字体文件设置命名模式
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name].[hash:8][ext]",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: "webpack use",
      filename: "index.html",
      template: "public/index.html",
    }),
  ],
};
