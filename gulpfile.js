let gulp = require('gulp')
let browserSync = require('browser-sync').create()
let sass = require('gulp-sass')
let del = require('del')

// Static Server + watching scss/html files
function serve(cb) {
    browserSync.init({
        server: "./src"
    })

    gulp.watch("src/scss/*.scss", style)
    gulp.watch("src/*.html").on('change', browserSync.reload)
    cb()
}

// Compile sass into CSS & auto-inject into browsers
function style() {
    return gulp.src("src/scss/*.scss")
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream())
}

function clear(){
    return del('src/css')
}

exports.default = gulp.series(clear, style, serve)
