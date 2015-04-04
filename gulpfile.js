'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({scope: ['devDependencies']});

gulp.task('jshint', function()
{
    gulp.src('./**/*.js')
        .pipe($.ignore.exclude(/node_modules/))
        .pipe($.jshint())
        .pipe($.jshint.reporter());
});

gulp.task('mocha', function () {
  gulp.src('./test', {read: false})
    .pipe($.mocha());
});

gulp.task('default', ['jshint'], function() {
    gulp.watch(['./test/**', './lib/**', './index.js'], ['jshint']);
});

gulp.task('test', ['mocha'], function() {
    gulp.watch(['./test/**', './lib/**', './index.js'], ['mocha']);
});
