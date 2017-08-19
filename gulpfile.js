var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var chalk = require('chalk');

// Run 'gulp' to start appl along with nodemon. 
gulp.task('default', function(){
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 3000
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function(){
        console.log(chalk.bgGreen('restarting..'));
    });
});