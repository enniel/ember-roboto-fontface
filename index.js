/* jshint node: true */
'use strict';

var path = require('path');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');
var util = require('util');
var extend = util._extend;

var defaultOptions = {
  importRobotoCSS: true,
  importRobotoFonts: true
};

var supportedPreprocessors = [
  'less',
  'sass'
];

module.exports = {
  name: 'ember-roboto-fontface',
  included: function() {
    this._super.included.apply(this, arguments);

    var app;

    // If the addon has the _findHost() method (in ember-cli >= 2.7.0), we'll just
    // use that.
    if (typeof this._findHost === 'function') {
      app = this._findHost();
    } else {
      // Otherwise, we'll use this implementation borrowed from the _findHost()
      // method in ember-cli.
      var current = this;
      do {
        app = current.app || app;
      } while (current.parent.parent && (current = current.parent));
    }

    this.preprocessor = this.findPreprocessor();
    var options = extend(defaultOptions, app.options['ember-roboto-fontface']);
    this.robotoOptions = options;

    if (!this.hasPreprocessor() && options.importRobotoCSS) {
      var vendorDirectory = this.treePaths.vendor;
      app.import(vendorDirectory + '/roboto/roboto-fontface.css');
      app.import(vendorDirectory + '/roboto-slab/roboto-slab-fontface.css');
      app.import(vendorDirectory + '/roboto-condensed/roboto-condensed-fontface.css');
    }
  },
  _robotoFontfacePath: function() {
    var source;

    try {
      var resolve = require('resolve');
      source = resolve.sync('roboto-fontface/package.json', { basedir: this.project.root });
    } catch (error) {
      source = require.resolve('roboto-fontface/package.json');
    }

    return path.dirname(source);
  },
  findPreprocessor: function() {
    var _this = this;
    return supportedPreprocessors.find(function(name) {
      return !!_this.app.project.findAddonByName('ember-cli-' + name);
    });
  },
  hasPreprocessor: function() {
    return !!this.preprocessor;
  },
  treeForVendor: function(tree) {
    var trees = [];

    if (!this.hasPreprocessor()) {
      trees.push(new Funnel(this._robotoFontfacePath(), {
        include: [
          '**/*.css'
        ],
        srcDir: 'css'
      }));
    }

    if (tree) {
      trees.push(tree);
    }

    return mergeTrees(trees, { overwrite: true });
  },
  treeForPublic: function(tree) {
    var trees = [];

    if (this.robotoOptions.importRobotoFonts) {
      trees.push(new Funnel(this._robotoFontfacePath(), {
        // @TODO make a selection from the configuration file
        destDir: 'fonts',
        srcDir: 'fonts'
      }));
    }

    if (tree) {
      trees.push(tree);
    }

    return mergeTrees(trees, { overwrite: true });
  },
  treeForStyles: function(tree) {
    var trees = [];
    if (this.hasPreprocessor()) {
      var preprocessor = this.preprocessor;
      var include = [];
      if (preprocessor === 'less') {
        include = [
          '*.less',
          '**/less/*.less',
          '**/less/*.less',
          '**/less/*.less'
        ];
      }
      if (preprocessor === 'sass') {
        include = [
          '*.scss',
          '**/sass/*.scss',
          '**/sass/*.scss',
          '**/sass/*.scss',
        ];
      }
      trees.push(new Funnel(this._robotoFontfacePath(), {
        include: include,
        destDir: 'ember-roboto-fontface',
        srcDir: 'css'
      }));
    }

    if (tree) {
      trees.push(tree);
    }

    return mergeTrees(trees, { overwrite: true });
  }
};
