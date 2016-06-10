/* @ jsx React.DOM */

var React = require('react'),
    ReactDOM = require('react-dom');
var app =  require('./components/ReactApp.jsx');
var ReactApp = React.createFactory(app);


// This script will run in the browser and will render our component using the
// value from APP_PROPS that we generate inline in the page's html on the server.
// If these props match what is used in the server render, React will see that
// it doesn't need to generate any DOM and the page will load faster


ReactDOM.render(ReactApp({}), document.getElementById('react-main-mount'))
