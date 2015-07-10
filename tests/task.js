var grunt = require('grunt'),
    yaml = require('js-yaml'),
    should = require('should'),
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

  function runTask(src, dest) {
    task.call({
      options: function () {
        return {};
      },

      files: [{
        src: Array.isArray(src) ? src : [src],
        dest: dest
      }]
    });
  }

  it('should be registered', function () {
    grunt.task.exists('data-merge').should.be.true();
  });

  it('should merge JSONs', function () {
    var json1 = '{"foo":{"bar":24,"baz":null}}';
    var json2 = '{"foo":{"bar":42}}';

    var expected = '{"foo":{"bar":42,"baz":null}}';

    var count = 0;
    hooker.hook(grunt.file, 'read', function () {
      count++;
      return hooker.preempt(count <= 1 ? json1 : json2);
    });

    hooker.hook(grunt.file, 'write', function (dest, data) {
      data.should.be.equal(expected);
    });

    runTask(['foo', 'bar']);
  });

  it('should merge YAMLs', function () {
    var yaml1 = 'foo:\n  bar: 24\n  baz: null\n';
    var yaml2 = 'foo:\n  bar: 42\n';

    var expected = 'foo:\n  bar: 42\n  baz: null\n';

    var count = 0;
    hooker.hook(grunt.file, 'read', function () {
      count++;
      return hooker.preempt(count <= 1 ? yaml1 : yaml2);
    });

    hooker.hook(grunt.file, 'write', function (dest, data) {
      data.should.be.equal(expected);
    });

    runTask(['foo.yml', 'bar.yaml'], 'out.yaml');
  });

  it('should merge JSON with YAML', function () {
    var json = '{"foo":{"bar":24,"baz":null}}';
    var yaml = 'foo:\n  bar: 42\n';

    var expected = '{"foo":{"bar":42,"baz":null}}';

    var count = 0;
    hooker.hook(grunt.file, 'read', function () {
      count++;
      return hooker.preempt(count <= 1 ? json : yaml);
    });

    hooker.hook(grunt.file, 'write', function (dest, data) {
      data.should.be.equal(expected);
    });

    runTask(['foo.json', 'bar.yaml']);
  });

  it('should write result as YAML', function () {
    var src = 'tmp/foo.yml',
        dest = 'tmp/bar.yaml';

    hooker.hook(grunt.file, 'write', function (dest, data) {
      yaml.safeLoad(data).should.not.throw();
    });

    runTask(src, dest);
  });

  it('should write result as JSON', function () {
    var src = 'tmp/foo',
        dest = 'tmp/bar.json';

    hooker.hook(grunt.file, 'read', function () {
      return hooker.preempt('{}');
    });

    hooker.hook(grunt.file, 'write', function (dest, data) {
      JSON.parse(data).should.not.throw();
    });

    runTask(src, dest);
  });

});
