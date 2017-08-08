var gulp = require('gulp');
var sass = require('gulp-sass');

var input = './src/*.scss';
var output = './dist/css/';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed',
  includePaths: [
    'node_modules/govuk_frontend_toolkit/stylesheets',
    'node_modules/govuk-elements-sass/public/sass'
  ]
};


gulp.task('watch', function() {
  gulp.watch(input, ['sass'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});


gulp.task('sass', function () {
  return gulp
    .src(input)
    .pipe(sass(sassOptions))
    .pipe(gulp.dest(output));
});


gulp.task('default', [ 'sass', 'watch' ]);
