var gulp = require('gulp'),
watch  = require('gulp-watch'),
sass   = require('gulp-sass'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
minifyCSS = require('gulp-minify-css'),
sourcemaps = require('gulp-sourcemaps'),
imagemin = require('gulp-imagemin'),
pngquant = require('imagemin-pngquant'),
rimraf = require('gulp-rimraf'),
browserSync = require('browser-sync').create();

var settings = {
	root_paths: {
		input: "assets/",
		output: "public/assets/",
	},
	server_path: "http://255.255.255.255/folder/public"
}

var images = {
	root_paths: {
		input: "img/",
		output: "img/"
	},
	watch: "**/*"
}

var javascript = {
	root_paths: {
		input: "js/",
		output: "js/"
	},
	merge: [
		'bower_components/jquery/dist/jquery.js',
		settings.root_paths.input + "js/**/*.js",
		settings.root_paths.input + "js/app.js"
	],
	as: "app",
	watch: [
		"**/*.js"
	]
}

var scss = {
	root_paths: {
		input: "scss/",
		output: "css/"
	},
	as: "app",
	watch: [
		"**/*.scss"
	]
}

var reloader = {
	what: settings.server_path,
	when: [
		"public/**/*.{css,js,html,php}"
	]
}

var copy = {
	paths: [
		{
			from: './bower_components/bootstrap-sass-official/assets/fonts/**/*',
			to: settings.root_paths.output + 'fonts'
		},
		{
			from: './bower_components/fontawesome/fonts/**',
			to: settings.root_paths.output + 'fonts/fontawesome'
		},
	]
}

// Core 
gulp.task('sass', function () {
	return gulp.src(settings.root_paths.input + scss.root_paths.input + scss.as + ".scss")
		.pipe(sass({errLogToConsole: true}))
		.pipe(concat(scss.as + ".css"))
		.pipe(minifyCSS())
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write("map"))
		.pipe(gulp.dest(settings.root_paths.output + scss.root_paths.output ))
});

gulp.task('javascript', function () {
	return gulp.src(javascript.merge)
		.pipe(concat(javascript.as + ".min.js"))
		.pipe(uglify())
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write("map"))
		.pipe(gulp.dest(settings.root_paths.output + javascript.root_paths.output ))
});

gulp.task('images', function () {
	gulp.src(settings.root_paths.output + images.root_paths.input )
		.pipe(rimraf({ force: true }));
	
	return gulp.src(settings.root_paths.input + images.root_paths.input + images.watch)
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(settings.root_paths.output + images.root_paths.output ));
});

gulp.task('watch', function () {
	
	gulp.watch( settings.root_paths.input + scss.root_paths.input + scss.watch, ['sass']);
	gulp.watch( settings.root_paths.input + javascript.root_paths.input + javascript.watch, ['javascript']);
	gulp.watch( settings.root_paths.input + images.root_paths.input + images.watch, ['images']);
	
	gulp.start(['start-browser-sync-server', 'default']);
	gulp.watch( reloader.when ).on('change', browserSync.reload );
	
});

// Misc
gulp.task('copy-required-files', function() {
	for( var i = 0; i < copy.paths.length; i++ ){
		gulp.src(copy.paths[i].from).pipe(gulp.dest(copy.paths[i].to));
	}
});

gulp.task('start-browser-sync-server', function () {
	browserSync.init({
		proxy: reloader.what
	});
});

gulp.task('default', ['sass', 'javascript', 'images']);