var gulp = require('gulp'),
    sprite = require('gulp-svg-sprite'),
    del = require('del'); 

let config = {
    shape: {
        dimension: {
            maxWidth:32,
            maxHeight: 32 
        },
        spacing: {
            padding:1 
        }
    },
    mode: { 
        css: { 
            render: {  
                css: {
                    template: './gulp/templates/sprite.css'
                  
                }
            }
        }
    }  
}
gulp.task('createSprite', ['cleanBefore'], function(){ 
    return gulp.src('./src/img/icons/**/*.svg') 
        .pipe(sprite(config))  
        .pipe(gulp.dest('./src/img/sprite/'))
})
gulp.task('cleanBefore', function(){
    return del('./src/img/sprite/');
})

gulp.task('copySpriteCss', ['createSprite'], function(){
    gulp.src('./src/img/sprite/css/*.css') 
        .pipe(gulp.dest('./src/components/css/'))
}) 

gulp.task('createIcons', ['cleanBefore', 'createSprite', 'copySpriteCss']); 