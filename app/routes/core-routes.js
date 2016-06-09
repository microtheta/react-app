var React = require('react'),
ReactDOMServer = require('react-dom/server');

var browserify = require('browserify');
var literalify = require('literalify');


module.exports = function(app) {

    app.get('/', function(req, res){
        // React.renderToString takes your component
        // and generates the markup
        var ReactApp = React.createFactory(require('../components/ReactApp'));
        var reactHtml = ReactDOMServer.renderToString(ReactApp({}));
        // Output html rendered by react
    res.render('index.pug', {reactOutput: reactHtml});
    });

    app.get('/maint.js', function(req, res) {

        /** TODO:: Find a way to use precompiled */

        res.setHeader('Content-Type', 'text/javascript');
        var babelify = require('babelify');
        browserify()
        .add('./app/main.js')
        .transform(babelify.configure({
            presets: ["es2015", "react"]
        }))
        .transform({
          global: true
        }, 'uglifyify')
        /*.transform(literalify.configure({
            'react': 'window.React',
            'react-dom': 'window.ReactDOM',
        }))*/
        .bundle()
        .pipe(res);

    });
};
