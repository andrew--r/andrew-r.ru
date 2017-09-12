import plumber from 'gulp-plumber';
import gutil from 'gulp-util';

export default function() {
  return plumber({
    errorHandler(error) {
      gutil.log([
        (`${error.name} in ${error.plugin}`).bold.red,
        '',
        error.message,
        ''
      ].join('\n'));
      this.emit('end');
    }
  })
}
