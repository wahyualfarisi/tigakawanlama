const gulp = require('gulp');
const uglify = require('gulp-uglify');

gulp.task('message', async function() {
    console.log('gulp is running')
})

gulp.task('minified-auth', async function(){
    gulp.src('public/auth/login.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/auth'))
})


