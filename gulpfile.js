const { series, parallel } = require("gulp");

// Import Gulp tasks
const { cleanPublic, cleanCache } = require("./modules/tasks/clean");
const {
  manifest,
  fonts,
  icons,
  images,
  staticCss,
  staticJs,
} = require("./modules/tasks/static");
const { styleVendor, styleLocal, styleMain } = require("./modules/tasks/style");
const {
  scriptVendor,
  scriptLocal,
  scriptMain,
} = require("./modules/tasks/script");
const html = require("./modules/tasks/html");
const serve = require("./modules/tasks/serve");
const watching = require("./modules/tasks/watching");

// Arrange tasks
const clean = parallel(cleanPublic, cleanCache);
const static = parallel(manifest, fonts, icons, images, staticCss, staticJs);
const style = series(parallel(styleVendor, styleLocal), styleMain);
const script = series(parallel(scriptVendor, scriptLocal), scriptMain);

// Define build task
const build = series(clean, parallel(static, style, script, html));

// Define start task (default task)
const start = series(build, serve, watching);

// Export tasks
exports.build = build;
exports.start = start;
exports.default = start;
