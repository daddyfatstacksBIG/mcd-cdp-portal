const gulp = require('gulp');
const surge = require('gulp-surge');
const fs = require('fs');

gulp.task('deploy-surge', () => {
  require('fs').createReadStream('./dist/index.html').pipe(fs.createWriteStream('./dist/200.html'));
  return surge({ project: './dist', domain: 'https://mcd-cdp-portal.surge.sh' });
});
