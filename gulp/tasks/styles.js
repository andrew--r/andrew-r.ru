import gulp from 'gulp';
import postcss from 'gulp-postcss';
import postcssAtImport from 'postcss-import';
import postcssCalc from 'postcss-calc';
import postcssCustomProperties from 'postcss-custom-properties';
import postcssCustomMedia from 'postcss-custom-media';
import postcssNesting from 'postcss-nesting';
import csso from 'gulp-csso';
import { SOURCE, STATIC_OUT } from '../config';

gulp.task('styles', () =>  gulp
  .src(`${SOURCE}/styles/design-system.css`)
  .pipe(postcss([
    postcssAtImport(),
    postcssNesting(),
    postcssCustomMedia(),
    postcssCalc(),
  ]))
  .pipe(csso())
  .pipe(gulp.dest(STATIC_OUT)));
