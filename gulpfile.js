import gulp from 'gulp';
import autoPrefixer from 'gulp-autoprefixer';
import sass from 'gulp-sass';
import dartSass from 'sass';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';

// Usar dartSass diretamente no gulp-sass
const compileSass = () => {
  return gulp
    .src('scss/*.scss')
    .pipe(sass(dartSass)({
      outputStyle: 'compressed'
    }))
    .pipe(autoPrefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream()); // Stream para atualizar CSS automaticamente
};

// Compilar JavaScript e recarregar o browser
const compileJs = () => {
  return gulp.src('js/scripts/*.js')
    .pipe(concat('all.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream()); // Stream para atualizar JS automaticamente
};

// Concatenar e recarregar plugins CSS
const pluginsCss = () => {
  return gulp
    .src(['./css/libs/aos.css', './css/libs/swiper.css'])
    .pipe(concat('plugins.css'))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
};

// Concatenar e recarregar plugins JS
const pluginsJs = () => {
  return gulp
    .src(['./js/libs/aos.js', './js/libs/swiper.js'])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream());
};

// Servidor de desenvolvimento com BrowserSync
const browser = () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
};

// Monitorar arquivos e executar tarefas
const watchFiles = () => {
  gulp.watch('scss/*.scss', compileSass); // Monitorar alterações em arquivos SASS
  gulp.watch('*.html').on('change', browserSync.reload); // Recarregar no HTML
  gulp.watch('css/libs/*.css', pluginsCss); // Monitorar alterações em plugins CSS
  gulp.watch('js/libs/*.js', pluginsJs); // Monitorar alterações em plugins JS
  gulp.watch('js/scripts/*.js', compileJs); // Monitorar alterações nos scripts JS
};

// Tarefas Gulp
gulp.task('browser-sync', browser);
gulp.task('sass', compileSass);
gulp.task('watch', watchFiles);
gulp.task('plugincss', pluginsCss);
gulp.task('pluginjs', pluginsJs);
gulp.task('scripts', compileJs);
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'scripts', 'pluginjs', 'plugincss'));
