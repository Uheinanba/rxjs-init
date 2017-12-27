module.exports = (options, req) => ({
  entry: "./src/index.js",
  html: {
    template: './index.html',
    // defaults to $cwd/index.ejs if it exists, otherwise use built-in template,
  },
});
