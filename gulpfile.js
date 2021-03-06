var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    minifyCss   = require('gulp-minify-css'),
    sm          = require('gulp-sourcemaps'),
    plumber     = require('gulp-plumber'),
    notify      = require('gulp-notify'),
    prefix      = require('gulp-autoprefixer'),
    browserSync = require('browser-sync');

/**
 * Paths
 */
var css = {
      in: 'src/css/',
      out: 'build/css'
    },

    js = {
      in: 'src/js/**/*.*',
      out: 'build/js'
    },

    img = {
      in: 'src/img/**/*.*',
      out: 'build/img'
    },

    fonts = {
      in: 'src/fonts/**/*.*',
      out: 'build/fonts'
    },

    html = {
      in: 'src/*.html',
      out: 'build/'
    };

gulp.task('js', function() {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/popper.js/dist/popper-utils.min.js',
    'node_modules/popper.js/dist/popper.min.js', 
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    js.in])
    .pipe(gulp.dest(js.out));
});

gulp.task('html', function(){
  return gulp.src(html.in)
    .pipe(gulp.dest(html.out));
});

gulp.task('img', function(){
  return gulp.src(img.in)
    .pipe(gulp.dest(img.out));
})

gulp.task('sass', function() {
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', css.in + '*.sass'])
    .pipe(plumber({
      errorHandler: function(err) {
        notify.onError({
          title: "Gulp error in " + err.plugin,
          message: err.toString()
        })(err);
      }
    }))
    .pipe(sm.init())
    .pipe(sass({
      onError: browserSync.notify
    }))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(minifyCss())
    .pipe(sm.write())
    .pipe(gulp.dest(css.out))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function() {
  gulp.watch(css.in + '**/*.*', ['sass']);
  gulp.watch(html.in, ['html']);
  gulp.watch(img.in, ['img']);
  gulp.watch(js.in, ['js']);
  gulp.watch(html.out + '*.html').on('change', browserSync.reload);
});

gulp.task('browser-sync', ['sass', 'html'], function() {
  browserSync({
    server: {
      baseDir: 'build'
    }
  });
});

gulp.task('default', ['browser-sync', 'watch']);
