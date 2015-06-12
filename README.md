# Skeleton

### Setup

1. Clone this repo
2. Pick you flavour (bootstrap or bourbon)
--* rename *-gulp.js to gulp.js, *-bower.json to bower.json
3. Run `bower install` and `npm install`

### Gulp Tasks

There's a few tasks setup to merge/compress JS and CSS. Simply add another directory to the js.merge[] array. SASS should really be merged using includes.

Simply run `gulp` to compile, or `gulp watch` to monitor files and recompile on the fly.

PROTIP: The latest version of gulp-sass seems broken with certain setups, use `1.3.3` instead if you're having issues.

### Other Tools

#### Composer

Not really required, but there's a couple of common libs I use.

#### IE8

If you ***really*** need IE8 support, simply add `"selectizr": "1.0.2"` to the dependencies{} list, and include it in your pages.