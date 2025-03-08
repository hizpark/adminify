const fs = require("fs-extra");

function cleanPublic(cb) {
  fs.remove("./public", cb);
}

function cleanCache(cb) {
  fs.remove("./cache", cb);
}

module.exports = { cleanPublic, cleanCache };
