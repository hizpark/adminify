const browserSync = require("../browserSync");

function serve(cb) {
  browserSync.init(
    {
      server: {
        baseDir: "./public",
      },
    },
    cb
  );
}

module.exports = serve;
