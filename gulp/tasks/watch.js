import gulp from 'gulp';
import { SOURCE } from '../config';

gulp.task('watch', ['build'], () => {
  gulp.watch(`${SOURCE}/**/*.pug`, ['markup']);
  gulp.watch(`${SOURCE}/**/*.css`, ['styles']);
});
