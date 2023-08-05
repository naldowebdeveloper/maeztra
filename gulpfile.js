const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const sourcemaps = require('gulp-sourcemaps');
const spritesmith = require('gulp.spritesmith');
const wait = require('gulp-wait');
const svgmin = require('gulp-svgmin')

//es6
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const babelify = require("babelify");
const gulpif = require("gulp-if");
const babel = require('gulp-babel');
const buffer = require("vinyl-buffer");
const babelifyConfig = {
  presets: ["es2015", "es2015-ie"],
  sourceMaps: false,
  plugins: ["syntax-async-functions", "transform-regenerator"]
};

gulp.task('sass', function () {
  return gulp.src(['assets/styles/**/*.css', 'assets/styles/**/*.scss'])
    .pipe(wait(1000))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sass().on('error', sass.logError))
    .pipe(cssmin())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('build/arquivos/'))
});

gulp.task('principalScripts', function () {
  return browserify({ debug: true })
    .transform(babelify.configure(babelifyConfig))
    .require("assets/scripts/App.js", { entry: true })
    .bundle()
    .on('error', swallowError)
    .pipe(source('00-maeztra-2023-scripts.js'))
    .pipe(buffer())
    .pipe(uglify().on("error", swallowError))

    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('build/arquivos/'))
});

gulp.task('svg', function () {
  return gulp.src('assets/svgs/**/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('build/arquivos/svgs/'))
})

gulp.task('images', function () {
  gulp.src('assets/images/**/*')
    .pipe(newer('build/arquivos/'))
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest('build/arquivos/images'))
});

gulp.task('sprite', function () {
  const spriteData = gulp.src('assets/images/sprite/**/*')
    .pipe(spritesmith({
      imgName: 'spritesheet-01.png',
      cssName: '_sprite.scss',
      padding: 10
    }))

  spriteData.img.pipe(gulp.dest('build/arquivos/'))
  spriteData.css.pipe(gulp.dest('assets/styles/settings/'))
});

gulp.task("watch", function () {
  gulp.watch(
    [
      "assets/scripts/**/*.js",
    ],
    ["principalScripts"]
  );
  gulp.watch("assets/styles/**/*.scss", ["sass"]);
  gulp.watch("assets/images/**/*", ["images"]);
  gulp.watch('assets/svgs/*.svg', ["svg"]);
  gulp.watch("assets/images/sprite/**/*", ["sprite"]);
});

gulp.task("scripts", ["principalScripts"]);

gulp.task("default", [
  "images",
  "svg",
  "watch",
  "sass",
  "sprite",
  "scripts"
]);

gulp.task('server', ['connect', 'watch', 'sprite']);
gulp.task('build', ['images', 'sass', 'scripts', 'sprite']);
gulp.task('js', ['scripts']);

function swallowError(error) {
  console.log(error.toString());
  this.emit('end');
}
