const {src , dest , watch , parallel} = require('gulp');

const scss         = require('gulp-sass')(require('sass'));
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync').create();
const uglify       = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');



function browsersync(){
  browserSync.init({
    server: { 
      baseDir: "public/"
    }
  });
}



function scripts() {
  return src([
    'app/js/index.js'
  ])  
    .pipe(concat('index.min.js'))
    .pipe(uglify())
    .pipe(dest('public/js'))
    .pipe(browserSync.stream())
}



function styles(){
  return src('app/scss/*scss')
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist:['last 10 version'],
      grid: true
    }))
    .pipe(dest('public/css'))
    .pipe(browserSync.stream())
}

function watching (){
  watch(['app/scss/*scss'], styles);
  watch(['app/js/*.js', '!public/js/main.min.js'], scripts);
  watch(['public/*html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching; 
exports.browsersync = browsersync;
exports.scripts = scripts; 



exports.default = parallel(styles, scripts, browsersync, watching);