var React = require('react'),
ReactDOMServer = require('react-dom/server');


module.exports = function(app) {

    app.get('/', function(req, res){
        // React.renderToString takes your component
        // and generates the markup
        var ReactApp = React.createFactory(require('../components/ReactApp.jsx'));
        var reactHtml = ReactDOMServer.renderToString(ReactApp({}));
        // Output html rendered by react
    res.render('index.pug', {reactOutput: reactHtml});
    });
    
    /*app.get('/maint.js', function(req, res) {
        /** TODO:: Find a way to use precompiled * /
        // building it using gulp!
        res.setHeader('Content-Type', 'text/javascript');

        var fs = require("fs");
        var browserify = require('browserify');
        var babelify = require('babelify');
        browserify()
        .add('./app/main.js')
        .transform(babelify.configure({
            presets: ["es2015", "react"]
        }))
        .transform({
          global: true
        }, 'uglifyify')
        .bundle()
        .pipe(fs.createWriteStream("bundle.js"));
    });*/
};
