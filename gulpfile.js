const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');

const input = './src/sass/*.scss';
const output = './dist/css/';

let sassOptions;
sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed',
  includePaths: [
    'node_modules/govuk_frontend_toolkit/stylesheets',
    'node_modules/govuk-elements-sass/public/sass',
  ],
};

gulp.task('copy-minify', () => {
  gulp.src([
    'node_modules/govuk_template_jinja/assets/stylesheets/fonts.css',
    'node_modules/govuk_template_jinja/assets/stylesheets/govuk-template.css',
  ])
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest(`${output}govuk/`));
});

gulp.task('copy-js', () => {
  gulp.src([
    'node_modules/jquery/dist/jquery.js',
  ])
    .pipe(gulp.dest('./dist/javascript/vendors/'));
});

// script paths
let jsFiles = 'src/javascript/*.js',
  jsDest = 'dist/javascript';

gulp.task('scripts', function() {
  return gulp.src(jsFiles)
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest));
});

gulp.task('watch', () => {
  gulp.watch(input, ['sass'])
    .on('change', (event) => {
      console.log(`File ${event.path} was ${event.type}, running tasks...`);
    });
  gulp.watch(jsFiles, ['scripts'])
    .on('change', (event) => {
      console.log(`File ${event.path} was ${event.type}, running tasks...`);
    });
});

gulp.task('sass', () => gulp
  .src(input)
  .pipe(sass(sassOptions))
  .pipe(gulp.dest(output)));


gulp.task('default', ['sass', 'scripts', 'watch', 'copy-minify', 'copy-js']);
