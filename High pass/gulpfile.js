const {src, dest, series, watch} = require('gulp');
const concat = require('gulp-concat');
const pug = require('gulp-pug');
const pugbem = require('gulp-pugbem');
pugbem.e = '__';
pugbem.m = '--';
const htmlMin = require('gulp-htmlmin');
const autoPrefixes = require('gulp-autoprefixer');
const cleanSCC = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const svgSprite = require('gulp-svg-sprite');
const imagemin = require('gulp-imagemin');
const imgCompress = require('imagemin-jpeg-recompress');
const notify = require("gulp-notify");
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const soursemaps = require('gulp-sourcemaps');
const del = require('del');
const uglify = require('gulp-uglify-es').default
const ttfToWoff = require('gulp-ttf2woff');
const ttfToWoffTwo = require('gulp-ttf2woff2');
const browserSync = require('browser-sync').create();


const fonts = () => {
  src('./src/fonts/**/*.ttf')
    .pipe(ttfToWoff())
    .pipe(dest('dist/fonts/'));
  return src('./src/fonts/**/*.ttf')
    .pipe(ttfToWoffTwo())
    .pipe(dest('dist/fonts/'))
}

const clean = () => {
  return del(['dist'])
}

const resources = () => {
  return src('src/resources/**')
    .pipe(dest('dist'))
}

const styles = () => {
  return src('src/styles/**/*.css')
    .pipe(soursemaps.init())
    .pipe(concat('main.css'))
    .pipe(autoPrefixes({
      cascade: false
    }))
    .pipe(cleanSCC({
      level: 2
    }))
    .pipe(soursemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const stylesSass = () => {
  return src(['src/blocks/**/*.scss', 'src/styles/**/*.scss'])
    // .pipe(soursemaps.init())
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths,
      outputStyle: 'expanded'
    }).on('error', notify.onError()))
    .pipe(soursemaps.init())
    .pipe(autoPrefixes({
      cascade: false
    }))
    .pipe(cleanSCC({
      level: 2
    }))
    .pipe(concat('style.css'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(soursemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const html = () => {
  return src('src/**/*.pug')
    .pipe(pug({
      plugins: [pugbem]
    }))
    .pipe(htmlMin({
        collapseWhitespace: true,
      }
    ))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const scripts = () => {
  return src([
    'src/js/components/**/*.js',
    'src/blocks/**/*.js',
    'src/js/**/*.js',
  ])
    .pipe(soursemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(soursemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const images = () => {
  return src([
    'src/images/**/*.jpg',
    'src/images/**/*.png',
    'src/images/*.svg',
    'src/images/**/*.jpeg',
  ])
    .pipe(imagemin([
      imgCompress({
        loops: 4,
        min: 70,
        max: 80,
        quality: 'high'
      }),
      imagemin.gifsicle(),
      imagemin.optipng(),
      imagemin.svgo()
    ]))
    .pipe(dest('dist/images'));
}

const svgSprites = () => {
  return src('src/images/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('dist/images'))
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

watch('src/**/*.pug', html)
watch('src/**/*.css', styles)
watch('src/**/*.scss', stylesSass);
watch('src/images/**/*.jpg', images);
watch('src/images/svg/**/*.svg', svgSprites);
watch('src/js/**/*.js', scripts);
watch('src/blocks/**/*.js', scripts);
watch('src/resources/**', resources);
watch('src/fonts/**/*.ttf', fonts);

exports.clean = clean
exports.styles = styles
exports.html = html
exports.scripts = scripts

exports.default = series(clean, resources, fonts, html, scripts, stylesSass, images, svgSprites, watchFiles)


const stylesForBuild = () => {
  return src('src/styles/**/*.css')
    .pipe(concat('main.css'))
    .pipe(autoPrefixes({
      cascade: false
    }))
    .pipe(cleanSCC({
      level: 2
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(dest('dist'))
}

const scriptsForBuild = () => {
  return src([
    'src/js/components/**/*.js',
    'src/js/**/*.js',
  ])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify({
      toplevel: true
    }).on('error', notify.onError()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(dest('dist'))
}


exports.build = series(clean, fonts, scriptsForBuild, resources, stylesForBuild, html, images, svgSprites)
