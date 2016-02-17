'use strict';

require('./tasks/lint-task.js');
require('./tasks/chrome-app.js');

const gulp = require('gulp');
const es = require('event-stream');
const gutil = require('gulp-util');
const fs = require('fs');
const path = require('path');
const cssbeautify = require('cssbeautify');

/** Write a theme based on an input file. */
var writeTheme = () => {
  return es.map((data, cb) => {
    let themeName = path.basename(data.path).replace('.css', '');
    let themeFile = themeName + '-styles.html';
    let themePath = './styles/' + themeFile;
    try {
      fs.statSync(themePath).isFile();
      gutil.log('File already exists: ' + themePath);
    } catch (e) {
      gutil.log('Writting to file: ' + themePath);
      let css = fs.readFileSync(data.path, 'utf8');
      css = cssbeautify(css, {
        indent: '  ',
        autosemicolon: true
      });
      let write = `<link rel="import" href="../../polymer/polymer.html">
<link rel="import" href="../../paper-styles/typography.html">
<dom-module id="${themeName}">
  <template>
    <style>
      ${css}
    </style>
  </template>
</dom-module>`;
      fs.writeFileSync(themePath, write);
    }
    cb(null, data);
  });
};
// make a stream that identifies if the given 'file' is a directory, and if so
// it pipelines it with the stream given
var forEachFolder = (stream) => {
  return es.map((data, cb) => {
    if (data.isDirectory()) {
      let pathToPass = data.path + '/*.css';
      if (stream !== undefined) {
        gulp.src([pathToPass])
          .pipe(stream());
      }
    }
    cb(null, data);
  });
};


// create shared styles from CodeMirror css files.
gulp.task('generate-themes', () => {
  return gulp.src('bower_components/codemirror/*')
    .pipe(forEachFolder(writeTheme));
});
