# Setup

Simply clone this repo, and run

    bower install
    npm install

to get started

## Gulp

There's a few tasks setup to merge/compress JS and CSS. Simply add another directory to the js.merge[] array. SASS should really be merged using includes.

Simply run `gulp` to compile, or `gulp watch` to monitor files and recompile on the fly.

PROTIP: The latest version of gulp-sass seems broke, use `1.3.1` instead if you're having issues.

### Composer

No really required, but there's a couple of common libs.

## IE8

If you need IE8 support, simply add `"selectizr": "1.0.2"` to the dependencies{} list, and include it in your pages.