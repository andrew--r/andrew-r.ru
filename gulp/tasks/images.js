import gulp from 'gulp';
import { SOURCE, STATIC_OUT } from '../config';

gulp.task('images', () => {
  return gulp
    .src(`${SOURCE}/images/*`)
    .pipe(gulp.dest(STATIC_OUT));
});
