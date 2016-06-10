
var fs = require("fs");
var browserify = require('browserify');
var babelify = require('babelify');
browserify()
.add('app/main.js')
.transform(babelify.configure({
    presets: ["es2015", "react"]
}))
.transform({
  global: true
}, 'uglifyify')
.bundle()
.pipe(fs.createWriteStream("public/maint.js"));