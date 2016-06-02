var gulp = require("gulp");
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", function () {
    return tsProject.src()
        .pipe(ts(tsProject))
        .js
        .pipe(rename('dotjem-angular-events.js'))
        .pipe(gulp.dest("dist"))
        .pipe(rename('dotjem-angular-events.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});