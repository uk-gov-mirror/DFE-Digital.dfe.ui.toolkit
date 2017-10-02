var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');

var input = './src/sass/*.scss';
var output = './dist/css/';

var sassOptions;
sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compressed',
    includePaths: [
        'node_modules/govuk_frontend_toolkit/stylesheets',
        'node_modules/govuk-elements-sass/public/sass'
    ]
};

gulp.task('copy-minify', function() {
  gulp.src([
      "node_modules/govuk_template_jinja/assets/stylesheets/fonts.css",
      "node_modules/govuk_template_jinja/assets/stylesheets/govuk-template.css"
  ])
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest(output + 'govuk/'));
});

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


gulp.task('default', [ 'sass', 'watch' , 'copy-minify' ]);
