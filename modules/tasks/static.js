const { src, dest } = require("gulp");

const vendor = require("../vendor");

function manifest() {
  return src([
    "./static/site.webmanifest",
    "./static/favicon.ico",
    "./static/*.png",
  ]).pipe(dest("./public"));
}

function fonts() {
  if (!vendor.fonts) {
    vendor.fonts = [];
  }
  return src([...vendor.fonts, "./static/fonts/**/*"], {
    allowEmpty: true,
  }).pipe(dest("./public/fonts"));
}

function icons() {
  if (!vendor.icons) {
    vendor.icons = [];
  }
  return src([...vendor.icons, "./static/icons/**/*"], {
    allowEmpty: true,
  }).pipe(dest("./public/icons"));
}

function images() {
  return src(["./static/images/**/*"], { allowEmpty: true }).pipe(
    dest("./public/images")
  );
}

function staticCss() {
  return src(["./static/css/**/*.css"], { allowEmpty: true }).pipe(
    dest("./public/css")
  );
}

function staticJs() {
  return src(["./static/js/**/*.js"], { allowEmpty: true }).pipe(
    dest("./public/js")
  );
}

module.exports = { manifest, fonts, icons, images, staticCss, staticJs };
