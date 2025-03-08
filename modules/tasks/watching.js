const { watch } = require("gulp");

const html = require("./html");
const { scriptLocal, scriptMain } = require("./script");
const { styleLocal, styleMain } = require("./style");
const { fonts, icons, images, staticJs, staticCss } = require("./static");

const browserSync = require("../browserSync");

function watching() {
  browserSync.watch("./public/**/*.html").on("change", browserSync.reload);
  browserSync.watch("./public/js/**/*.js").on("change", browserSync.reload);

  watch(["./static/fonts/**/*"], fonts);
  watch(["./static/icons/**/*"], icons);
  watch(["./static/images/**/*"], images);
  watch(["./static/js/**/*.js"], staticJs);
  watch(["./static/css/**/*.css"], staticCss);

  watch(["./cache/*.js"], scriptMain);
  watch(["./cache/*.css"], styleMain);

  watch(["./src/script/**/*.js"], scriptLocal);
  watch(["./src/style/**/*.scss"], styleLocal);
  watch(["./src/templates/**/*.html"], html);
}

module.exports = watching;
