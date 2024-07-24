const gulp = require('gulp');
// Convertation of scss to css
const plumber = require("gulp-plumber");
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
// Server
const sync = require("browser-sync").create();



//------------------------Task which creates file structure is used -------------------------
// const final =() => {
//   return gulp.src('*.*', {read: false})
//   .pipe(gulp.dest('./src'))
//   .pipe(gulp.dest('./src/scss/modules'))
//   .pipe(gulp.dest('./buld'))
//   .pipe(gulp.dest('./img/content'))
//   .pipe(gulp.dest('./img/icons'))
//   .pipe(gulp.dest('./fonts'))
//   .pipe(gulp.dest('./js'));
// }
// exports.final=final


//------------------------ Convertation of scss to css -------------------------

const styles =() => {
  return gulp.src("src/sass/style.scss")
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))                                   // Convert scss to css
  .pipe(postcss([
    autoprefixer()                                // Add vendor prefixes to CSS
  ]))
  .pipe(sourcemaps.write("."))
  .pipe(gulp.dest("src/css"))
}
exports.styles=styles


const server =(done)=>{
  sync.init({
    server: {
      baseDir: 'src'
    },
    open: "true",
    cors: true,
    notify: false,
    ui: false,
  });
  done()
}


exports.server=server

const browsersyncReload=(done)=>{
  sync.reload();
  done()

}



//------------------------ Watcher -------------------------

const watcher = () =>{
  gulp.watch("src/sass/**/*.scss", gulp.series(styles) );
  gulp.watch("src/*.html",gulp.series(browsersyncReload))
  gulp.watch("src/css/*.css",gulp.series(browsersyncReload))
}

exports.watcher=watcher




exports.start=gulp.series(server,watcher)


