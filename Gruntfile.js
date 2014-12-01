module.exports = function(grunt) {

  grunt.initConfig({
    mochaTest: {
      spec: {
        options: {
          reporter: 'spec',
          require: 'blanket'
        },
        src: ['tests/**/*.js']
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          quiet: true,
          captureFile: 'coverage/coverage.html'
        },
        src: ['tests/**/*.js']
      },
      lcov: {
        options: {
          reporter: 'mocha-lcov-reporter',
          quiet: true,
          captureFile: 'coverage/lcov.info'
        },
        src: ['tests/**/*.js']
      }
    },
    coveralls: {
      options: {
        force: true
      },
      all: {
        src: 'coverage/lcov.info'
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-coveralls');

  grunt.registerTask('test', 'mochaTest');
  grunt.registerTask('default', 'test');
  grunt.registerTask('ci', ['default', 'coveralls']);

};
