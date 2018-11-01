/**
 * @author: ManhNV
 * @description: minify and compile code
 * @version: 1.0.0
 * */

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import removeEmptyLines from 'gulp-remove-empty-lines';
import removeHtmlComments from 'gulp-remove-html-comments';
import strip from 'gulp-strip-comments';
import stripDebug from 'gulp-strip-debug';
import optimizeImage from 'gulp-image';
import miniFyCss from 'gulp-clean-css';
import autoPrefixer from 'gulp-autoprefixer';
// import replace from 'gulp-replace';
import cache from 'gulp-cache';
import rimraf from 'rimraf';
import shell from 'gulp-shell';
import mkdirp from 'mkdirp';
import yargs from 'yargs';
import through from 'through2';

const runSequence = require('run-sequence').use(gulp);
const argv = yargs['argv'];
const imageRootDev = require('./server/config/environment/development').imageStore.root;
const imageRootProd = require('./server/config/environment/production').imageStore.root;

//directory public
const build = "dist";

const server = {
  src: {
    src_server: ['server/**/*.js'],
    asset_server: [
      'server/**/*.json',
      'server/**/*.ico',
      'server/**/*.p8'
    ],
    images: [
      'server/**/*.jpg',
      'server/**/*.png',
      'server/**/*.jpeg',
      'server/**/*.gif'
    ],
    css: 'server/**/*.css',
    html: 'server/**/*.html'
  },
  public: {
    src_server: `${build}/server`,
    asset_server: `${build}/server`,
    images: `${build}/server`,
    css: `${build}/server`,
    html: `${build}/server`
  }
};

const path = {
  doc: [
    'README.md',
    'server/api/**/*.model.js',
    'server/api/**/*.service.js'
  ],
  rootServer: 'server',
  src: {
    server: server.src,
    package_manage: '*.json'
  },
  public: {
    server: server.public,
    package_manage: `${build}`
  }
};

/*================ TASK RUNNER SERVER ***************==================================*/

/**
 * @description: reset root server build
 */
gulp.task('server:remove-build', cb => {
  rimraf('./dist/server', cb);
});

/**
 * @description: check syntax server javascript
 * @author: ManhNV
 */
gulp.task('server:lint', () => {
  return gulp.src(path.src.server.src_server)
    .pipe(eslint(), {
      configFile: `${path.rootServer}/.eslintrc`,
      env: [
        'browser',
        'es6',
        'mocha'
      ]
    })
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/**
 * @author: ManhNV
 * @version: 1.0.0
 * @description: copy assets server
 */
gulp.task('server:copy-asset-server', () => {
  gulp.src(path.src.server.asset_server)
    .pipe(gulp.dest(path.public.server.asset_server));
});

/**
 * @author: ManhNV
 * @version: 1.0.0
 * @description: Task runner server
 */
gulp.task('server:optimize-image', () => {
  const optionOptimizeImage = {
    pngquant: true,
    optipng: true,
    zopflipng: true,
    jpegRecompress: true,
    jpegoptim: false,
    mozjpeg: true,
    gifsicle: true,
    svgo: true
  };
  return gulp.src(path.src.server.images)
    .pipe(plumber())
    .pipe(cache(optimizeImage(optionOptimizeImage)))
    .pipe(gulp.dest(path.public.server.images));
});

//install plugin transform-runtime
gulp.task('server:compile-es6', () => {
  return gulp.src(path.src.server.src_server)
    .pipe(plumber())
    .pipe(babel({
      plugins: ['transform-runtime']
    }))
    .pipe(logFileHelpers())
    .pipe(strip())
    .pipe(stripDebug({debugger: false, console: true}))
    .pipe(removeEmptyLines({
      removeComments: true
    }))
    .pipe(gulp.dest(path.public.server.src_server));

  function logFileHelpers() {
    return through.obj((file, enc, cb) => {
      console.log(file.babel.usedHelpers);
      cb(null, file);
    });
  }
});

gulp.task('server:css', () => {
  return gulp.src(path.src.server.css)
    .pipe(plumber())
    .pipe(autoPrefixer({
      browsers: ['last 2 version'],
      cascade: false
    }))
    .pipe(miniFyCss({debug: true, compatibility: 'ie8'}, detail => {
      console.log(`${detail.name}: ${detail.stats['originalSize']}`);
      console.log(`${detail.name}: ${detail.stats['minifiedSize']}`);
      console.log('----------------------------------------------');
    }))
    .pipe(gulp.dest(path.public.server.css));
});

gulp.task('server:html', () => {
  return gulp.src(path.src.server.html)
    .pipe(plumber())
    .pipe(removeHtmlComments())
    .pipe(removeEmptyLines())
    .pipe(gulp.dest(path.public.server.html));
});

/**
 * @description: copy config environment
 * @author: ManhNV
 * @version: 1.0.0
 */
gulp.task('copy-package', () => {
  return gulp.src(path.src.package_manage)
    .pipe(gulp.dest(path.public.package_manage));
});

gulp.task('server:default', callback => {
  runSequence(
    // 'server:remove-build',
    ['copy-package', 'server:copy-asset-server'],
    'server:compile-es6',
    ['server:css', 'server:html'],
    callback
  );
});

gulp.task('server:build', callback => {
  runSequence(
    // 'server:remove-build',
    ['copy-package', 'server:copy-asset-server'],
    'server:compile-es6',
    ['server:css', 'server:html'],
    'server:optimize-image',
    callback
  );
});

gulp.task('share', () => {
  const production = argv['production'];
  mkdirp(production ? imageRootProd : imageRootDev, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log(`Init public directory safehold-${production ? 'prod' : 'dev'} success!`);
    }
  });
});

gulp.task('dev', (() => {
  const watch = argv['watch'];
  return shell.task([
    'gulp share --development',
    `${watch ? 'nodemon' : 'node'} ./server/index.js development`
  ]);
})());

gulp.task('local', (() => {
  const watch = argv['watch'];
  return shell.task([
    'gulp share --development',
    `${watch ? 'nodemon' : 'node'} ./server/index.js local`
  ]);
})());

gulp.task('build:development', shell.task([
  'rm -rf dist/docs&&gulp gen-docs',
  `gulp share --development`
]));

gulp.task('build:production', shell.task([
  'rm -rf dist/docs&&gulp gen-docs',
  `rm -rf dist/server&&gulp share&&gulp server:build`,
  'cd dist&&yarn install --production'
]));

// *** Support extension thirty *************************
// doc api
gulp.task('gen-docs', shell.task([
  // 'apidoc -i server/ *.controller.js -o dist/public',
  "apidoc -i server/ -f \".*\\.controller\\.js$\" -f \".*\\\\.ts$\" -o dist/public"
]));