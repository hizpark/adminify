const through = require("through2");

function noop() {
  return through.obj();
}

module.exports = noop;
