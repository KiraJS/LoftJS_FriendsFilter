var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var webserver = require('gulp-webserver');

//sass
gulp.task('scss', function (){
  return gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'))
    .pipe(notify('Done!'));
})

//webserver
gulp.task('webserver', function(){
  gulp.src('')
    .pipe(webserver({
      livereload: true,
      open: true,
      port: 8034,
    }));
})

//watch
gulp.task('watch', function () {
//  gulp.watch('**/*.js', ['js']);
  gulp.watch('**/*.scss', ['scss']);
})


//default
gulp.task('default', ['scss', 'watch', 'webserver'])
