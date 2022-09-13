import ESLintPlugin from "eslint-webpack-plugin";
import StyleLintPlugin from "stylelint-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default (env) => {
  const plugins = [
    // HTML Plugin
    new HtmlWebpackPlugin({
      template: `${env.paths.publicFolder}/index.html`,
    }),

    // CSS Plugin
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),

    // ESLint
    new ESLintPlugin({
      failOnError: false,
      quiet: true,
    }),

    // Stylelint
    new StyleLintPlugin({
      configFile: ".stylelintrc.json",
      context: "src",
      files: "**/*.scss",
      fix: true,
      failOnError: false,
      quiet: true,
    }),

    // Copy files
    new CopyPlugin({
      patterns: [
        {
          from: `${env.paths.publicFolder}\\manifest.json`,
          to: `${env.paths.buildFolder}`,
        },
        {
          from: `${env.paths.publicFolder}\\google-touch-icon.png`,
          to: `${env.paths.buildFolder}`,
        },
      ],
    }),
  ];

  return plugins;
};
