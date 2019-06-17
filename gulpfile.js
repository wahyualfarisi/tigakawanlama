const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

gulp.task('message', async function() {
    console.log('gulp is running')
})

gulp.task('minified-auth', async function(){
    gulp.src('public/auth/login.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/auth'))
});

gulp.task('minified-admin-karyawan', async function() {
    gulp.src('public/admin/karyawan/*.js')
        .pipe(concat('karyawan.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/admin/karyawan'))
});


