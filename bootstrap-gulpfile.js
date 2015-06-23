var gulp = require('gulp'),
watch  = require('gulp-watch'),
sass   = require('gulp-sass'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
minifyCSS = require('gulp-minify-css'),
sourcemaps = require('gulp-sourcemaps');

var js_rules = {
	merge: [
		'bower_components/jquery/dist/jquery.js', 
		'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
		'assets/js/app.js'
	],
	in: 'public/assets/js',
	as: 'app.min.js',
	watch: 'assets/js/app.js',
	sourcemap: 'map'
};

var sass_rules = {
	merge: [
		'assets/scss/app.scss'
	],
	in: 'public/assets/css',
	as: 'app.css',
	watch: 'assets/scss/*.scss',
	sourcemap: 'map'
};

var copy_rules = {
	from: './bower_components/bootstrap-sass-official/assets/fonts/**/*',
	to: 'public/assets/fonts'
}

gulp.task('sass', function () {
	gulp.src(sass_rules.merge) // Get 'assets/scss/app.scss'
	.pipe(sass({errLogToConsole: true}))) // SASS compile
	.pipe(concat(sass_rules.as)) // as app.css
	.pipe(minifyCSS())
	.pipe(sourcemaps.init())
	.pipe(sourcemaps.write(sass_rules.sourcemap))
	.pipe(gulp.dest(sass_rules.in)); // in 'assets/css'
});

gulp.task('js', function () {
	gulp.src(js_rules.merge) // Get these files
	.pipe(concat(js_rules.as)) // concat to app.min.js
	.pipe(uglify()) // compress
	.pipe(sourcemaps.init())
	.pipe(sourcemaps.write(js_rules.sourcemap))
	.pipe(gulp.dest(js_rules.in)) // in 'assets/js/'
});

gulp.task('install-bootstrap', function() {
  gulp.src(copy_rules.from)
	.pipe(gulp.dest(copy_rules.to));
})

gulp.task('watch', function () {
	gulp.watch(sass_rules.watch, ['sass']);
	gulp.watch(js_rules.watch, ['js']);
});

gulp.task('default', ['sass', 'js']);
