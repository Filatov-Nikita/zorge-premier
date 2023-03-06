'use strict';
const
  gulp = require('gulp'),
  cheerio = require('gulp-cheerio'),
  svgSprite = require('gulp-svg-sprite'),

  paths = [
    './src/assets/svg/*.svg',
    './src/assets/svg/*.svg'
  ]
;

function serve() {
  gulp.watch(paths, gulp.series('spritesSvg'));
}

function spritesSvg() {
  return gulp.src(paths)
    .pipe(cheerio({
      run: $ => {
        $('style').remove();
        $('[fill]').removeAttr('fill');
        $('[style]').removeAttr('style');
        $('[class]').removeAttr('class');
        $('[stroke]').removeAttr('stroke');
        $('[opacity]').removeAttr('opacity');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(svgSprite({
      mode: {
        inline: true,
        symbol: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(gulp.dest('./static'));
}

exports.spritesSvg = spritesSvg;
exports.serve = serve;

gulp.task('default', gulp.series(
  gulp.parallel(spritesSvg, serve)
));
