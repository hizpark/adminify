const { src, dest } = require("gulp");
const template = require("../plugins/gulp-art-template");

const data = require("../data");

function html() {
  return src(["./src/templates/*.html"])
    .pipe(
      template(data, {
        extname: ".html",
        root: "./src/templates",
      })
    )
    .pipe(dest("./public"));
}

module.exports = html;
