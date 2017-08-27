import gulp from 'gulp';
import ftp from 'vinyl-ftp';
import gutil from 'gulp-util';
import { FTP_DEST } from '../config';
import ftpCredentials from '../ftp.json';

gulp.task('deploy', () => {
  const ftpConnection = ftp.create({
    host: ftpCredentials.host,
    user: ftpCredentials.user,
    password: ftpCredentials.password,
    log: gutil.log,
  });

  return gulp
    .src(`${OUT}/**/*`)
    .pipe(ftpConnection.newerOrDifferentSize(FTP_DEST))
    .pipe(ftpConnection.dest(FTP_DEST))
});
