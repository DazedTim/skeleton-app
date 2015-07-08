var gulp = require('gulp'),
watch  = require('gulp-watch'),
sass   = require('gulp-sass'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
minifyCSS = require('gulp-minify-css'),
sourcemaps = require('gulp-sourcemaps'),
browserSync = require('browser-sync').create();

var settings = {
	base_input: "assets/",
	base_output: "public/assets/",
	server_path: "http://255.255.255.255/folder/public"
}

var javascript = {
	root_paths: {
		input: "js/",
		output: "js/"
	},
	merge: [
		'bower_components/jquery/dist/jquery.js',
		"assets/js/**/*.js",
		"assets/js/app.js"
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
		"public/*",
		"public/**/*",
	]
}

var copy = {
	paths: [
		{
			from: './bower_components/bootstrap-sass-official/assets/fonts/**/*',
			to: 'public/assets/fonts'
		},
		{
			from: './bower_components/fontawesome/fonts/**',
			to: 'public/assets/fonts/fontawesome'
		},
	]
}

// Core 
gulp.task('sass', function () {
	gulp.src(settings.base_input + scss.root_paths.input + scss.as + ".scss")
	.pipe(sass({errLogToConsole: true}))
	.pipe(concat(scss.as + ".css"))
	.pipe(minifyCSS())
	.pipe(sourcemaps.init())
	.pipe(sourcemaps.write("map"))
	.pipe(gulp.dest(settings.base_output + scss.root_paths.output ))
});

gulp.task('javascript', function () {
	gulp.src(javascript.merge)
	.pipe(concat(javascript.as + ".min.js"))
	.pipe(uglify())
	.pipe(sourcemaps.init())
	.pipe(sourcemaps.write("map"))
	.pipe(gulp.dest(settings.base_output + javascript.root_paths.output ))
});


gulp.task('watch', function () {
	
	gulp.watch( settings.base_input + scss.root_paths.input + scss.watch, ['sass']);
	gulp.watch( settings.base_input + javascript.root_paths.input + javascript.watch, ['javascript']);
	
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

gulp.task('default', ['sass', 'javascript']);