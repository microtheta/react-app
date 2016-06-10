// server.js

var express = require('express'),
path = require('path'),
app = express(),
port = 4444,
bodyParser = require('body-parser');

// Make sure to include the JSX transpiler

require("babel-register")({
  presets: [ 'es2015', 'react' ],
  only: '*.jsx'
});

//set UA for material-ui server side rendering
app.use(function(req, res, next) {
    global.navigator = {
        userAgent: req.headers['user-agent']
    }
    next();
});

// Include static assets. Not advised for production
app.use(express.static(path.join(__dirname, 'public')));
// Set view path
app.set('views', path.join(__dirname, 'views'));

// set up pug for templating. You can use whatever
app.set('view engine', 'pug');


// Set up Routes for the application
require('./app/routes/core-routes.js')(app);

//Route not found -- Set 404
app.get('*', function(req, res) {
    res.json({
        'route': 'Sorry this page does not exist!'
    });
});

app.listen(port);
console.log('Server is Up and Running at Port : ' + port);
