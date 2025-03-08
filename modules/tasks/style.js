const { src, dest } = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const cached = require("gulp-cached");
const remember = require("gulp-remember");
const concat = require("gulp-concat");
const sassPartialsImported = require("gulp-sass-partials-imported");

const noop = require("../noop");
const vendor = require("../vendor");
const browserSync = require("../browserSync");

const isDevelopment = process.env.NODE_ENV === "development";

function styleVendor(cb) {
  if (!vendor.css || vendor.css.length === 0) {
    return cb();
  }

  return src(vendor.css).pipe(concat("vendor.css")).pipe(dest("./cache"));
}

function styleLocal() {
  const scssDir = "./src/style";
  const includePaths = [scssDir];
  return src(["./src/style/**/*.scss"])
    .pipe(cached("style"))
    .pipe(sassPartialsImported(scssDir, includePaths))
    .pipe(isDevelopment ? sourcemaps.init() : noop())
    .pipe(sass({ includePaths: scssDir }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(remember("style"))
    .pipe(concat("local.css"))
    .pipe(isDevelopment ? sourcemaps.write(".") : noop())
    .pipe(dest("./cache"));
}

function styleMain() {
  return src(["./cache/vendor.css", "./cache/local.css"], { allowEmpty: true })
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(concat("main.css"))
    .pipe(cleanCSS({ format: "beautify" }))
    .pipe(dest("./public/css"))
    .pipe(cleanCSS({ level: { 1: { specialComments: false } } }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(dest("./public/css"))
    .pipe(isDevelopment ? browserSync.stream() : noop());
}

module.exports = { styleVendor, styleLocal, styleMain };
