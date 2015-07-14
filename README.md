# Skeleton

### Setup

1. Clone this repo
2. Edit the bower.json
  * For bootstrap, move `_bootstrap_dependencies` to `dependencies`
  * For bourbon, move `_bourbon_dependencies` to `dependencies`
3. run `nmp install` to install gulp and its tools
4. run `bower install` to download the required libs
5. edit gulpfile.js
  * change `server_path` for live reloading
  * add your javascript files to `javascripts.merge[]`
6. run `bower install` to download the required libs
7. If you're using bootstrap and/or font-awesome, run `gulp copy-required-files` to move fonts across
8. make changes to `public/` 

### Notes

1. All raw files are in `assets/`, including a entrypoint app.scss and app.js
3. The latest version of gulp-sass seems broken with certain setups, use `1.3.3` instead if you're having issues.
4. If you ***really*** need IE8 support, simply add `"selectizr": "1.0.2"` to `dependencies` in bower.json , and include it in your pages.
