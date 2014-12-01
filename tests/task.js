var grunt = require('grunt'),
    yaml = require('js-yaml'),
    hooker = grunt.util.hooker,
    dataMergeTask = require('../tasks/data-merge');

describe('Grunt task', function () {

  var task = null;

  beforeEach(function () {
    task = dataMergeTask(grunt);

    hooker.hook(grunt.file, ['read', 'write'], function () {
      return hooker.preempt();
    });

    hooker.hook(grunt.log, ['ok'], function () {
      return hooker.preempt();
    });
  });

  afterEach(function () {
    hooker.unhook(grunt.file);
    hooker.unhook(grunt.log);
  });

  it('task should exist', function () {
    if (!grunt.task.exists('data-merge')) {
      throw new Error('Task "data-merge" was not found');
    }
  });

  it('should write result as YAML for .yml|.yaml dests', function () {
    var src = 'tmp/foo.yml',
        dest = 'tmp/bar.yaml';

    hooker.hook(grunt.file, 'write', function (dest, data) {
      try {
        yaml.safeLoad(data);
      }
      catch (err) {
        err.message = 'Writing not valid YAML data. ' + err.message;
        throw err;
      }
    });

    task.call({
      options: function () {
        return {};
      },

      files: [{
        src: [src],
        dest: dest
      }]
    });
  });

  it('should write result as JSON', function () {
    var src = 'tmp/foo.json',
        dest = 'tmp/bar.json';

    hooker.hook(grunt.file, 'read', function () {
      return hooker.preempt('{}');
    });

    hooker.hook(grunt.file, 'write', function (dest, data) {
      try {
        JSON.parse(data);
      }
      catch (err) {
        err.message = 'Writing not valid JSON data. ' + err.message;
        throw err;
      }
    });

    task.call({
      options: function () {
        return {};
      },

      files: [{
        src: [src],
        dest: dest
      }]
    });
  });

});
