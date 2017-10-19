const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglifyjs');

const config = {
  bowerDir: './bower_components',
  publicDir: './template/public',
  sassPath: './template/css',
};

gulp.task('fonts', () => gulp.src([
  `${config.bowerDir}/bootstrap-sass/assets/fonts/**/*`,
])
  .pipe(gulp.dest(`${config.publicDir}/fonts`)));

gulp.task('icons', () => gulp.src([
  `${config.bowerDir}/font-awesome/fonts/**/*`,
])
  .pipe(gulp.dest(`${config.publicDir}/fonts`)));

gulp.task('js', () => gulp.src([
  `${config.bowerDir}/jquery/dist/jquery.min.js`,
  `${config.bowerDir}/bootstrap-sass/assets/javascripts/bootstrap.js`,
])
  .pipe(uglify('app.js', {
    compress: false,
    outSourceMap: true,
  }))
  .pipe(gulp.dest(`${config.publicDir}/js`)));

gulp.task('css', () => gulp.src('template/css/app.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'compressed',
    includePaths: [`${config.bowerDir}/bootstrap-sass/assets/stylesheets`,
      `${config.bowerDir}/font-awesome/css`],
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(`${config.publicDir}/css`)));

// Rerun the task when a file changes
gulp.task('watch', () => {
  gulp.watch(`${config.sassPath}/**/*.scss`, ['css']);
});

gulp.task('default', ['css', 'js', 'fonts', 'icons']);
