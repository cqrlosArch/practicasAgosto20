const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssnanoPlugin = require("cssnano-webpack-plugin");
const autoprefixer = require("autoprefixer");
const TerserPlugin = require("terser-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

const utils = require("./utils");

module.exports = (env) => {
  return {
    entry: "./src/app.js",
    output: {
      filename: "./js/[name].[contenthash].js",
      path: path.resolve(__dirname, "../dist"),
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/plugin-transform-runtime",
              ],
            },
          },
        },
        {
          test: /\.(sa|sc|c)ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [autoprefixer],
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.(png|jpe?g|gif|ico|svg)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "./assets/images",
                useRelativePath: true,
              },
            },
            {
              loader: "image-webpack-loader",
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65,
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: [0.65, 0.9],
                  speed: 4,
                },
                gifsicle: {
                  interlaced: false,
                },
                // the webp option will enable WEBP
                webp: {
                  quality: 75,
                },
              },
            },
          ],
        },
        {
          test: /\.(ttf|eot|woff2?|mp4|mp3|txt|xml|pdf)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "./assets/files",
                useRelativePath: true,
              },
            },
          ],
        },
        {
          test: /\.pug$/,
          use: ["pug-loader"],
        },
      ],
    },
    resolve: {
      extensions: ["*", ".pug", ".js", ".css", ".scss", ".sass"],
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin(), new CssnanoPlugin()],
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/](node_modules|vendors)[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/views/index.pug",
        minify: true,
      }),
      ...utils.pages(env),

      new MiniCssExtractPlugin({
        filename: "./css/styles.css",
      }),
      new BrowserSyncPlugin(
        {
          host: "localhost",
          port: 3000,
          proxy: "http://localhost:8080/",
        },
        {
          reload: false,
        }
      ),
    ],
  };
};
