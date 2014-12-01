var path = require('path'),
    clc = require('cli-color'),
    yaml = require('js-yaml'),
    merge = require('lodash.merge');

module.exports = function (grunt) {

  grunt.registerMultiTask('data-merge', 'Merge JSON/YAML data files.', task);

  function task(env) {
    var options = this.options();

    this.files.forEach(function (filePair) {
      var dest = filePair.dest,
          result = {};

      filePair.src.forEach(function (src) {
        var data = grunt.file.read(src);

        if (isYaml(src)) {
          merge(result, yaml.safeLoad(data));
        }
        else {
          merge(result, JSON.parse(data));
        }
      });

      if (isYaml(dest)) {
        result = yaml.safeDump(result, { indent: options.space });
      }
      else {
        result = JSON.stringify(result, null, options.space);
      }

      grunt.log.ok([
        'Writing result to ',
        clc.cyan(dest),
        '...',
        clc.green('OK')
      ].join(''));

      grunt.file.write(dest, result);
    });
  }

  function isYaml(filename) {
    var ext = path.extname(filename);
    return (ext === '.yml' || ext === '.yaml') ? true : false;
  }

  return task;

};
