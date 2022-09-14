import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default () => {
  const loaders = [
    // Styles
    {
      test: /\.(css|sass|scss)$/,
      use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
    },

    // JavaScript
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ["babel-loader"],
    },

    // Images
    {
      test: /\.(png|jpg|svg|gif|webp)$/,
      type: "asset/resource",
      generator: {
        filename: "[name][ext]",
        outputPath: (pathData) =>
          pathData.filename.split("/").slice(1, -1).join("/"), // <-- "img/<subfolders>"
      },
    },

    // Fonts
    {
      test: /.(woff|woff2)$/,
      type: "asset/resource",
      generator: {
        filename: "[name][ext]",
        outputPath: "fonts",
        publicPath: "../fonts/",
      },
    },

    // Files
    {
      test: /^files\//,
      type: "asset/resource",
      generator: {
        filename: "[name][ext]",
        outputPath: "files/",
      },
    },
  ];

  return loaders;
};
