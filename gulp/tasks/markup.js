import gulp from 'gulp';
import uncache from 'gulp-uncache';
import minifyMarkup from 'gulp-htmlmin';
import { SOURCE, OUT } from '../config';

gulp.task('markup', ['styles'], () => {
  return gulp
    .src(`${SOURCE}/index.html`)
    .pipe(uncache())
    .pipe(minifyMarkup({
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeComments: true,
      removeRedundantAttributes: true,
    }))
    .pipe(gulp.dest(OUT));
});
