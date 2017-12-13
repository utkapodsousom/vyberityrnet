var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    minifyCss   = require('gulp-minify-css'),
    sm          = require('gulp-sourcemaps'),
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
  return gulp.src(js.in)
    .pipe(gulp.dest(js.out));
});

gulp.task('html', function(){
  return gulp.src(html.in)
    .pipe(gulp.dest(html.out));
});

gulp.task('sass', function() {
  return gulp.src(css.in + '*.sass')
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
