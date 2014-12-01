# grunt-data-merge v0.1.0 [![Build Status](https://travis-ci.org/rd5/grunt-data-merge.svg?branch=master)](https://travis-ci.org/rd5/grunt-data-merge) [![Coverage Status](https://coveralls.io/repos/rd5/grunt-data-merge/badge.png?branch=master)](https://coveralls.io/r/rd5/grunt-data-merge?branch=master)

> Merge JSON/YAML data files.

Task takes multiple JSON and/or YAML files and writes merged result of all sources to the destination.


## Getting Started

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-data-merge --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-data-merge');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-copy/tree/grunt-0.3-stable).*


## data-merge task

_Run this task with the `grunt data-merge` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.


### Options

##### space

Type: `String | Number`

Causes the resulting string to be pretty-printed.


### Usage Examples

By order, extend common data by partials data, and partials data by pages data:

```js
grunt.loadNpmTasks('grunt-data-merge');

grunt.initConfig({
  'data-merge': {
    options: {
      space: 2
    },

    build: {
      files: {
        'data/build/index.json': [
          'data/common.json',
          'data/build/partials.yml',
          'data/pages/index.yml'
        ]
      }
    }
});
```


## Release History

 * 2014-12-02   v0.1.0   Initial release
