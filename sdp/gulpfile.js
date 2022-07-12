const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const pug = require('gulp-pug');
const htmlMin = require('gulp-htmlmin');
const autoPrefixes = require('gulp-autoprefixer');
const cleanSCC = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const imagemin = require('gulp-imagemin');
const imgCompress = require('imagemin-jpeg-recompress');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const soursemaps = require('gulp-sourcemaps');
const del = require('del');
const uglify = require('gulp-uglify-es').default;
const webpackStream = require('webpack-stream');
// const ttfToWoff = require('gulp-ttf2woff');
// const ttfToWoffTwo = require('gulp-ttf2woff2');
const browserSync = require('browser-sync').create();

// const fonts = () => {
//   src('./src/fonts/**/*.ttf').pipe(ttfToWoff()).pipe(dest('dist/fonts/'));
//   return src('./src/fonts/**/*.ttf')
//     .pipe(ttfToWoffTwo())
//     .pipe(dest('dist/fonts/'));
// };
const isProd = false;
// paths

const srcFolder = './src';
const buildFolder = './dist';
const path = {
  srcPug: `${srcFolder}/markup/pages/*.pug`,
  srcFullPug: `${srcFolder}/markup/**/*.pug`,
  srcSvg: `${srcFolder}/assets/svg/**.svg`,
  buildSvgFolder: `${buildFolder}`,
  srcImgFolder: `${srcFolder}/assets/images`,
  buildImgFolder: `${buildFolder}/assets/images`,
  srcFullScss: `${srcFolder}/scss/blocks/**/*.scss`,
  srcScss: `${srcFolder}/scss/pages/*.scss`,
  buildCssFolder: `${buildFolder}`,
  srcFullJs: `${srcFolder}/js/**.*.js`,
  srcIndexJs: `${srcFolder}/js/index.js`,
  srcCatalogJs: `${srcFolder}/js/catalog.js`,
  buildJsFolder: `${buildFolder}`,
};

const fonts = () => {
  src('./src/assets/fonts/**/*.woff').pipe(dest('dist/assets/fonts'));
  return src('./src/assets/fonts/**/*.woff2').pipe(dest('dist/assets/fonts'));
};

const clean = () => del(['dist']);

const stylesSass = () =>
  src(path.srcScss)
    .pipe(soursemaps.init())
    .pipe(
      sass({
        // eslint-disable-next-line global-require
        includePaths: require('node-normalize-scss').includePaths,
        outputStyle: 'expanded',
      }).on('error', notify.onError())
    )
    .pipe(
      autoPrefixes({
        cascade: false,
        grid: true,
        overrideBrowserslist: ['last 5 versions'],
      })
    )
    .pipe(
      cleanSCC({
        level: 2,
      })
    )
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(soursemaps.write())
    .pipe(dest(path.buildCssFolder))
    .pipe(browserSync.stream());

const html = () =>
  src(path.srcPug)
    .pipe(
      pug({
        locals: {
          require,
        },
      })
    )
    .pipe(
      htmlMin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest('dist'))
    .pipe(browserSync.stream());

const scripts = () => {
  src(path.srcIndexJs)
    .pipe(soursemaps.init())
    .pipe(
      webpackStream({
        mode: isProd ? 'production' : 'development',
        output: {
          filename: 'index.js',
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        targets: 'defaults',
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
        devtool: !isProd ? 'source-map' : false,
      })
    )
    .pipe(soursemaps.write())
    .pipe(dest(path.buildJsFolder))
    .pipe(browserSync.stream());
  return src(path.srcCatalogJs)
    .pipe(soursemaps.init())
    .pipe(
      webpackStream({
        mode: isProd ? 'production' : 'development',
        output: {
          filename: 'catalog.js',
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        targets: 'defaults',
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
        devtool: !isProd ? 'source-map' : false,
      })
    )
    .pipe(soursemaps.write())
    .pipe(dest(path.buildJsFolder))
    .pipe(browserSync.stream());
};
const images = () =>
  src([`${path.srcImgFolder}/**/**.{jpg,jpeg,png,svg}`])
    .pipe(
      imagemin([
        imgCompress({
          loops: 4,
          min: 70,
          max: 80,
          quality: 'high',
        }),
        imagemin.gifsicle(),
        imagemin.optipng(),
        imagemin.svgo(),
      ])
    )
    .pipe(dest(path.buildImgFolder));

const svgSprites = () =>
  src(path.srcSvg)
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    // .pipe(
    //   cheerio({
    //     run($) {
    //       $('[fill]').removeAttr('fill');
    //       $('[stroke]').removeAttr('stroke');
    //       $('[style]').removeAttr('style');
    //     },
    //     parserOptions: {
    //       xmlMode: true,
    //     },
    //   })
    // )
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg',
          },
        },
      })
    )
    .pipe(dest(path.buildSvgFolder));

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  });
};

watch(path.srcFullPug, html);
// watch('src/**/*.css', styles);
watch(path.srcFullScss, stylesSass);
watch(path.srcImgFolder, images);
watch(path.srcSvg, svgSprites);
watch(path.srcIndexJs, scripts);
watch(path.srcCatalogJs, scripts);
// watch('src/blocks/**/*.js', scripts);
// watch('src/resources/**', resources);
// watch(, fonts);

exports.clean = clean;
// exports.styles = styles;
exports.html = html;
exports.scripts = scripts;

exports.default = series(
  clean,
  // resources,
  fonts,
  scripts,
  images,
  svgSprites,
  stylesSass,
  html,
  watchFiles
);

const stylesForBuild = () =>
  src('src/styles/**/*.css')
    .pipe(concat('main.css'))
    .pipe(
      autoPrefixes({
        cascade: false,
      })
    )
    .pipe(
      cleanSCC({
        level: 2,
      })
    )
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(dest('dist'));

const scriptsForBuild = () =>
  src(['src/js/components/**/*.js', 'src/js/**/*.js'])
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(concat('app.js'))
    .pipe(
      uglify({
        toplevel: true,
      }).on('error', notify.onError())
    )
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(dest('dist'));

exports.build = series(
  clean,
  fonts,
  scriptsForBuild,
  // resources,
  stylesForBuild,
  html,
  images,
  svgSprites
);
