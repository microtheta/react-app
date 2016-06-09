
/* create factory with griddle component */
/*var React = require('react');
var Griddle = React.createFactory(require('griddle-react'));

var fakeData = require('../data/fakeData.js').fakeData;
var columnMeta = require('../data/columnMeta.js').columnMeta;
var resultsPerPage = 200;

var ReactApp = React.createClass({

      componentDidMount: function () {
        console.log(fakeData);

      },
      render: function () {
        return (
              <div id="table-area">
              <Griddle results={fakeData}
                columnMetadata={columnMeta}
                resultsPerPage={resultsPerPage}
                tableClassName="table"/>

          </div>
        )
      }
  });

/* Module.exports instead of normal dom mounting * /
module.exports = ReactApp;
*/

import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {green100, green500, green700} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#3b5998',
    primary2Color: green700,
    primary3Color: green100,
  },
}, {
  avatar: {
    borderColor: null,
  }
  
});
//userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36' //req.headers['user-agent'],
import AppBar from 'material-ui/AppBar';

const styles = {
  'headerContainer': {
    'paddingBottom': '65px'
  },
  'header': {
    position: 'fixed'
  },
  'fullText': {
    width:'100%'
  }
};


const AppBarCmp = () => (
  <div style={styles.headerContainer}>
    <AppBar
      title="Hello"
      style={styles.header} 
      iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
  </div>
);

import TextField from 'material-ui/TextField';

const TextFieldExampleSimple = () => (
  <div className="row">
    <div className="col-md-6 col-md-offset-3">
      <TextField
        hintText="Message Field"
        id="TextareaField"
        floatingLabelText="MultiLine and FloatingLabel"
        name="firstText"
        multiLine={true}
        style={styles.fullText}
        rows={2}
      />
    </div>
  </div>
);

var MyAwesomeReactComponent = React.createClass({

      componentDidMount: function () {
       // console.log(fakeData);
      },
      render: function () {
        return (
          <div>
            <AppBarCmp/>
            <div className="container-fluid">
              <TextFieldExampleSimple/>
            </div>
          </div>
        )
      }
  });


class Main extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <MyAwesomeReactComponent />
      </MuiThemeProvider>
    );
  }
}
module.exports = Main;