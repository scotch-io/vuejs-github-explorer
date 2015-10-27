var gulp = require('gulp');
var copy = require('gulp-copy');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var browserify = require('browserify');
var partialify = require('partialify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('html', function() {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());;
});

gulp.task('css', function() {
    var stylesheets = [
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
        'node_modules/font-awesome/css/font-awesome.min.css',
        'src/css/app.css'
    ];

    gulp.src(stylesheets)
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('fonts', function() {
    var fonts = [
        'node_modules/bootstrap/dist/fonts/*',
        'node_modules/font-awesome/fonts/*'
    ];

    gulp.src(fonts)
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('js', function() {
    browserify({
        entries: 'src/js/app.js',
        debug: true
    })
    .transform(partialify)
    .bundle()
    .on('error', function (err) {
        console.log(err.toString());
        this.emit("end");
    })
    .pipe(source('app.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .on('error', function (err) {
            console.log(err.toString());
            this.emit("end");
        })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

gulp.task('start-server', function() {
    connect.server({ root: 'dist', livereload: true });
});

gulp.task('watch:html', function() {
    gulp.watch('src/*.html', ['html']);
});

gulp.task('watch:js', function() {
    gulp.watch('src/js/**/*.*', ['js']);
});

gulp.task('compile', ['html', 'css', 'fonts', 'js']);
gulp.task('watch', ['compile', 'watch:html', 'watch:js']);
gulp.task('serve', ['watch', 'start-server']);
gulp.task('default', ['compile']);