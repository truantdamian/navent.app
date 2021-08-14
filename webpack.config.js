const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const alias = {
  Components: path.resolve(__dirname, "src/components/"),
  Hooks: path.resolve(__dirname, "src/hooks/"),
  Constants: path.resolve(__dirname, "src/constants/"),
  Contexts: path.resolve(__dirname, "src/contexts/"),
  Icons: path.resolve(__dirname, "src/icons/"),
  Styles: path.resolve(__dirname, "src/styles/"),
  Helpers: path.resolve(__dirname, "src/helpers/"),
};
module.exports = {
  resolve: { alias },
  devServer: {
    historyApiFallback: true,
    contentBase: "./",
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: "style-loader",
            options: {
              esModule: true,
              modules: {
                namedExport: true,
              },
            },
          },
          {
            loader: "css-loader",
            options: {
              esModule: true,
              modules: {
                namedExport: true,
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ],
};
