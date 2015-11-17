/**
 *初始化项目前端
 */

'use strict';


var gulp = require('gulp'),
    less = require('gulp-less'),
    $ = require('gulp-load-plugins')(),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
;
var browserify = require('browserify');
var reload = browserSync.reload;
var watchify = require('watchify');
var webpackConfig = require('./webpack.config');
var webpack = require('gulp-webpack');

var AUTOPREFIXER_BROWSERS = [
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 2.3',
    'bb >= 10'
];

var paths = {
    dist: {
        base: 'dist',
        js: 'dist/js',
        css: 'dist/css',
        image: 'dist/image'
    }
};

// 洗刷刷
gulp.task('clean', function (cb) {
    del(['dist/*', '!dist/.git'], {dot: true}, cb());
});


// 图片优化
gulp.task('images', function () {
    return gulp.src('app/i/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(paths.dist.image))
        .pipe($.size({title: 'images'}));
});


// 编译 Less，添加浏览器前缀
gulp.task('styles', function () {
    return gulp.src(['app/less/app.less'])
        .pipe($.less())
        .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
        .pipe(gulp.dest('dist/css'))
        .pipe($.csso())
        .pipe($.rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'))
        .pipe($.size({title: 'styles'}));
});


gulp.task('buildJs', function () {
    return gulp.src(['app/js/app.js'])
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('dist/js'))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe($.size({title: 'es'}));
});

// 压缩 HTML
gulp.task('html', function () {
    return gulp.src('app/**/*.html')
        .pipe($.minifyHtml())
        .pipe(gulp.dest('dist'))
        .pipe($.size({title: 'html'}));
});

// 监视源文件变化自动cd编译
gulp.task('watch', function () {
    gulp.watch('app/**/*.html', ['html']);
    gulp.watch('app/less/**/*less', ['styles']);
    gulp.watch('app/image/**/*', ['images']);
    gulp.watch('app/js/**/*', ['buildJs']);
});


// 启动预览服务，并监视 Dist 目录变化自动刷新浏览器
gulp.task('dev', ['default', 'watch'], function () {
    browserSync({
        notify: false,
        logPrefix: 'ASK',
        server: 'dist'
    });

    gulp.watch(['dist/**/*'], reload);
});


// 默认任务
gulp.task('default', function (cb) {
    runSequence('clean', ['buildJs', 'styles', 'html', 'images'], cb);
});





