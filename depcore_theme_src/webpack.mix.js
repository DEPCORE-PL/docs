let mix = require("laravel-mix");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const webpack = require('webpack');

mix.setPublicPath("../");
mix
.sass("./src/scss/main.scss", "depcore_theme/assets/css/")
.js("./src/js/main.js", "depcore_theme/assets/js/");

mix.sourceMaps(); // Enable sourcemaps


mix.options({
  processCssUrls: false, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
  clearConsole: false,        // Prevents console clearing on rebuild
  progress: false,            // Disables progress bar
});

mix.webpackConfig({
  watchOptions: { ignored: "node_modules" }, // Ignore node_modules
  devtool: "inline-source-map",
    stats: 'minimal',          // Simplifies terminal output
  infrastructureLogging: {
    level: 'warn',          // Only show errors
  },
  plugins: [
    new CopyWebpackPlugin({
               patterns: [
        {
          from: "**/*.html",
          to: "depcore_theme/[path][name][ext]",
          context: __dirname,
          globOptions: { ignore: ["**/node_modules/**"] }
        },
        {
          from: path.resolve(__dirname, "assets"),
          to: "depcore_theme/assets"
        },
        {
          from: ".",
          to: "depcore_theme",
          filter: (resourcePath) => {
            const filesToCopy = ["mkdocs_theme.yml", "__init__.py"];
            return filesToCopy.includes(path.basename(resourcePath));
          }
        }
      ]
    }),
  ],
});
