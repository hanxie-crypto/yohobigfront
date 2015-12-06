/**
 * GULP ENTRY
 * author: wq(aitongbian123@163.com)
 * date: 2015/6/29
 */

var gulp = require('gulp'),
    compass = require('gulp-compass'),
    server = require('gulp-develop-server');

gulp.task('default', ['server', 'server:restart', 'compass-watch', 'compass']);

// start express server
gulp.task('server', function() {
    server.listen({
        path: 'app.js'
    });
});

// restart server if app.js changed
gulp.task('server:restart', function() {
    gulp.watch(['app.js', 'controllers/wap/*.js', 'public/js/data.js'], server.restart);
});

// compass watch
gulp.task('compass-watch', function() {
    gulp.watch('public/sass/**/*.scss', ['compass']);
});

//compass
gulp.task('compass', function() {
    gulp.src('public/sass/**/*.scss')
        .pipe(
            compass({
                config_file: 'config.rb',
                css: 'public/css',
                sass: 'public/sass'
            })
        )
});