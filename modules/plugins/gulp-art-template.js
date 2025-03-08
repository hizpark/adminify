const through = require("through2");
const assign = require("object-assign");
const PluginError = require("plugin-error");
const template = require("art-template");

const PLUGIN_NAME = "gulp-art-template";

function gulpArtTemplate(data = {}, options = {}, settings = {}) {
  const defaults = {
    minimize: false,
    cache: false,
    include: function (filename, includeData, includeBlock, includeOptions) {
      includeData = assign({}, includeData, data);
      return template.defaults.include(
        filename,
        includeData,
        includeBlock,
        includeOptions
      );
    },
    ...options, // 將自定義選項合併到默認選項中
  };

  return through.obj(function (file, encoding, callback) {
    if (file.isNull()) {
      this.push(file);
      return callback();
    }

    if (file.isStream()) {
      this.emit(
        "error",
        new PluginError(PLUGIN_NAME, "Streams are not supported!")
      );
      return callback();
    }

    data = assign({}, data, file.data);
    options = assign({}, defaults, settings); // 合併所有選項

    options.filename = file.path;

    try {
      const rendered = template.render(file.contents.toString(), data, options);
      file.contents = Buffer.from(rendered);

      if (typeof settings.ext !== "undefined") {
        file.path = file.path.replace(/\.[^.]+$/, "") + settings.ext;
      }

      this.push(file);
    } catch (err) {
      this.emit(
        "error",
        new PluginError(PLUGIN_NAME, err, { fileName: file.path })
      );
    }

    callback();
  });
}

module.exports = gulpArtTemplate;
