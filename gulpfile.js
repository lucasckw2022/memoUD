var gulp = require("gulp");
var browserify = require("browserify");
var reactify = require("reactify");
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var paths = {
  scss: ['app/stylesheets/*.scss'],
  main_js: ['app/components/main.jsx'],
  js: ['app/components/*.jsx'],
};

gulp.task('main_js', function(){
  browserify(paths.main_js)
    .transform(reactify)
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
  gulp.watch(paths.scss, ['styles']);
  gulp.watch(paths.main_js, ['main_js']);
});

// The default task (called when we run `gulp` from cli)
gulp.task('default', ['watch','styles','main_js']);
