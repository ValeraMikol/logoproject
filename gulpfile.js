const gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    pug = require('gulp-pug'),
    sass = require('gulp-sass')(require('sass')),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    webpack = require('webpack-stream'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat');


const app = 'app/',
      dist = 'dist/'

const config = {
    app : {
        // html: app + 'pug/*.pug',
        html: app + 'html/*.html',
        style: app + 'scss/*.scss',
        js: app + 'js/*.js',
        fonts: app + 'fonts/**/*.*',
        img: app + 'img/**/*.*',
    },
    dist : {
        html: dist,
        style: dist + 'css/',
        js: dist + 'js/',
        fonts: dist + 'fonts/',
        img: dist + 'img/',
    },
    watch : {
        // html: app + 'pug/**/*.pug',
        html: app + 'html/**/*.html',
        style: app + 'scss/**/*.scss',
        js: app + 'js/**/*.js',
        fonts: app + 'fonts/**/*.*',
        img: app + 'img/**/*.*',
    }
}

const webServer = () => {
    browserSync.init({
        server: {
            baseDir: dist
        },
        port: 9000,
        host: 'localhost',
        notify: false
    })
}

// const pugTask = () => {
//     return gulp.src(config.app.html)
//         .pipe(pug())
//         .pipe(pug({
//             pretty: false
//         }))
//         .pipe(gulp.dest(config.dist.html))
//         .pipe(browserSync.reload({ stream: true }))
// }

const htmlTask = () => {
    return gulp.src(config.app.html)
        .pipe(gulp.dest(config.dist.html))
        .pipe(browserSync.reload({ stream: true }))
}

const scssTask = () => {
    return gulp.src(config.app.style)
        
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe( 
            autoprefixer({ 
                overrideBrowserslist: ["last 5 versions"], 
                grid: true, 
                flexbox: false, 
            }) 
        ) 
        .pipe(gulp.dest(config.dist.style))
        .pipe(browserSync.reload({ stream: true }))
}

const jsTask = () => {
    return gulp.src(config.app.js)
        .pipe(webpack({mode: "production"}))
        .pipe(babel({ presets: ["@babel/env"] }))
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest(config.dist.js))
        .pipe(browserSync.reload({ stream: true }))
}

const imgTask = () => {
    return gulp.src(config.app.img)
        .pipe(gulp.dest(config.dist.img))
        .pipe(browserSync.reload({ stream: true }))
}

const fontsTask = () => {
    return gulp.src(config.app.fonts)
        .pipe(gulp.dest(config.dist.fonts))
        .pipe(browserSync.reload({ stream: true }))
}

const watchFiles = () => {
    // gulp.watch([config.watch.html], gulp.series(pugTask))
    gulp.watch([config.watch.html], gulp.series(htmlTask))
    gulp.watch([config.watch.style], gulp.series(scssTask))
    gulp.watch([config.watch.js], gulp.series(jsTask))
    gulp.watch([config.watch.img], gulp.series(imgTask))
    gulp.watch([config.watch.fonts], gulp.series(fontsTask))
}

const start = gulp.series(htmlTask, scssTask, jsTask, imgTask, fontsTask) // pugTask

exports.default = gulp.parallel(start, watchFiles, webServer)
