var gulp = require("gulp");
var babel = require("gulp-babel");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var paths = {
  scss: ['app/stylesheets/*.scss'],
  main_js: ['app/components/main.jsx'],
  js: ['app/components/*.js'],
};

gulp.task('main_js', function(){
  browserify(paths.main_js)
    .transform(babelify, {presets: ["es2015", "react"]})
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('styles', function(){
  gulp.src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets/'))
})

// Rerun tasks whenever a file changes.
gulp.task('watch', function() {
  gulp.watch('app/**/*.js', ['main_js']);
  gulp.watch(paths.scss, ['styles']);
  gulp.watch(paths.main_js, ['main_js']);
});

// The default task (called when we run `gulp` from cli)
gulp.task('default', ['watch','styles','main_js']);
