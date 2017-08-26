import gulp from 'gulp';

import postcss from 'gulp-postcss';
import postcssAtImport from 'postcss-import';
import postcssCalc from 'postcss-calc';
import postcssCustomProperties from 'postcss-custom-properties';
import csso from 'gulp-csso';
import uncache from 'gulp-uncache';
import minifyMarkup from 'gulp-htmlmin';
import ftp from 'vinyl-ftp';
import gutil from 'gulp-util';
import ftpCredentials from './ftp.json';

const SOURCE = './source';
const OUT = './build';
const STATIC_OUT = `${OUT}/static`;
const FTP_DEST = '/httpdocs';

gulp.task('styles', () =>  gulp
	.src(`${SOURCE}/styles/design-system.css`)
	.pipe(postcss([
		postcssAtImport(),
		postcssCalc(),
	]))
	.pipe(csso())
	.pipe(gulp.dest(STATIC_OUT))
);

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

gulp.task('images', () => {
	return gulp
		.src(`${SOURCE}/images/*`)
		.pipe(gulp.dest(STATIC_OUT));
});

gulp.task('build', ['markup', 'styles', 'images']);

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

gulp.task('default', ['build']);
