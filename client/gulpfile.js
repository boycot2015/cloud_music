var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
// var concat = require('gulp-concat');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var watch = require('gulp-watch');
var bs = require('browser-sync').create();
var less = require('gulp-less');
var babel = require("gulp-babel"); // 用于ES6转化ES5
// var browserify = require('browserify');
// var source = require('vinyl-source-stream');
// var es = require('event-stream');
// var glob = require('glob');
function logError (logError) {
    console.log(logError)
    this.emit('end')
}
// 为避免写死路径,这里我们定义路径,然后方面后面随时更改.
var path = {
    'html': './src/pages/**/',//中间的**代表任意目录
    'css': './src/less/**/',
    'js': './src/js/',
    'images': './src/images/',
    'css_dist': './dist/css/',
    'js_dist': './dist/js/',
    'es5_js': './dist/js/es5/',
    'async_js': './dist/js/async/',
    'images_dist': './dist/images'
};

//定义相应任务
//定义处理HTML文件任务,HTML文件中增删改查,可以直接在浏览器中显示出来
gulp.task('html', function () {
    gulp.src(path.html + '*.html')
        .pipe(bs.stream()) //重新加载
});

// 定义css任务
gulp.task('css', function () {
    gulp.src(path.css + '*.less')
        .pipe(less().on('error', logError))
        .pipe(cssnano())
        .pipe(rename({ 'suffix': '.min' }))
        .pipe(gulp.dest(path.css_dist))
        .pipe(bs.stream())
});

//定义处理js任务
gulp.task("js", function () {
    return gulp.src(path.js + '*.js') // ES6 源码存放的路径
        .pipe(babel({
            presets: ['es2015', 'es2016', 'es2017'],
            "plugins": ["transform-object-rest-spread"]
        })) // ES6转化为ES5
        .pipe(gulp.dest(path.es5_js)) //转换成 ES5 存放的路径
        // .src(path.es5_js + '*.js')
        .pipe(uglify())
        .pipe(gulp.dest(path.js_dist))
        .pipe(bs.stream())
});
/* 下面的是为了让浏览器支持import和export，babelify这个放到了package.json中了 */
// gulp.task('browserify', gulp.series('js', function (done) {
//     glob(path.js_dist + '*.js', function (err, files) {
//         if (err) done(err);
//         var tasks = files.map(function (entry) {
//             return browserify({ entries: [entry] })
//                 .bundle()
//                 .pipe(source(entry))
//                 // .pipe(rename({
//                 //     extname: '.bundle.js'
//                 // }))
//                 .pipe(gulp.dest('./'));
//         });
//         es.merge(tasks).on('end', done);
//     })
// }));
// gulp.task('js', function () {
//     gulp.src(path.es5_js + '*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest(path.js_dist))
//         .pipe(bs.stream())
// });

//定义处理图片任务
gulp.task('images', function () {
    gulp.src(path.images + '*.*')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(path.images_dist))
        .pipe(bs.stream())
});

//定义监听文件修改的任务
gulp.task('watch', function () {
    watch(path.html + '*.html', gulp.series('html'));
    watch(path.css + '*.less', gulp.series('css')); //这里不能用gulp.watch(),要不然本机只能加载一次,之后就无变化
    watch(path.js + '*.js', gulp.series('js'));
    // watch(path.js + '*.js', gulp.series('browserify'));
    watch(path.images + '*.*', gulp.series('images'));
});

//创建服务器,浏览器立马可以看到 browser-sync
gulp.task('bs', function () {
    bs.init({
        'port': 8088,
        // 'proxy': "http://localhost/mydir",
        'server': {
            'baseDir': './',
        }
    })
});

//创建一个默认服务,可以默认执行
gulp.task('music', gulp.parallel('bs', 'watch', 'css', 'js', 'images', 'html'));
// gulp.task('default', gulp.series('bs', 'watch',gulp.parallel('css', 'js', 'images') ));