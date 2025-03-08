const { src, dest } = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const terser = require("gulp-terser");
const rename = require("gulp-rename");
const concat = require("gulp-concat");

const noop = require("../noop");
const vendor = require("../vendor");

const isDevelopment = process.env.NODE_ENV === "development";

function scriptVendor(cb) {
  if (!vendor.js || vendor.js.length === 0) {
    return cb();
  }

  return src(vendor.js).pipe(concat("vendor.js")).pipe(dest("./cache"));
}

function scriptLocal() {
  return src(["./src/script/**/*.js"], { allowEmpty: true })
    .pipe(isDevelopment ? sourcemaps.init() : noop())
    .pipe(concat("local.js"))
    .pipe(isDevelopment ? sourcemaps.write(".") : noop())
    .pipe(dest("./cache"));
}

function scriptMain() {
  return src(["./cache/vendor.js", "./cache/local.js"], { allowEmpty: true })
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(concat("main.js"))
    .pipe(terser({ format: { beautify: true } }))
    .pipe(dest("./public/js"))
    .pipe(terser({ format: { comments: false } }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(dest("./public/js"));
}

module.exports = { scriptVendor, scriptLocal, scriptMain };
