'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var plumber = require('gulp-plumber');

gulp.task('compile', function() {
    return gulp.src('./src/*.scss')
    .pipe(plumber())
    .pipe(sass.sync())
    .pipe(autoprefixer({
        browsers: ['ie > 9', 'last 2 versions'],
        cascade: false
    }))
    .pipe(cssmin())
    .pipe(gulp.dest('./lib'));
});

gulp.task('build', ['compile']);
gulp.task('watch', function () {
    gulp.watch('./src/*.scss', ['compile']);
});