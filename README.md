# Skeleton

### Setup

1. Clone this repo
2. run `nmp install` to install everything
3. edit gulpfile.js
  * change `server_path` for live reloading
  * add your javascript files to `javascripts.merge[]`
4. run `bower install` to download the required libs
5. If you're using bootstrap and/or font-awesome, run `gulp copy-required-files` to move fonts across
6. make changes to `public/` 

### Notes

1. All raw files are in `assets/`, including a entrypoint app.scss and app.js
3. The latest version of gulp-sass seems broken with certain setups, use `1.3.3` instead if you're having issues.