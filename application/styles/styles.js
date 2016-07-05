'use strict';
var React = require('react-native');
var { StyleSheet, PixelRatio } = React;
var {MKColor} = require('react-native-material-kit');

var navHeight = 56

var styles = StyleSheet.create({

    navigator: {
      height: navHeight,
      backgroundColor: MKColor.DeepPurple,
      paddingLeft: 16,
      paddingRight: 16,
      elevation: 4

    },

    navBarText: {
      color:'#ffffff',
      fontSize: 20,
      // paddingLeft: 72,
      paddingBottom: 14,
      // paddingTop: ,
      // marginBottom: 20,

      textAlignVertical: 'bottom',
      // fontStyle enum('normal', 'italic')

    },

    menuButton: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: 24,
      width: 24,
      // paddingLeft: 16,
      // paddingBottom: 16,
      // paddingTop: 16,
      // marginLeft: ,
      marginBottom: 16,
      marginTop: 16,
    },
    menuItem:{
      height: 55,
      width: 300,
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      flexDirection:'row'
    },

    selected: {
      backgroundColor: 'rgba(255, 64, 129, 0.15)',
    },
    menuItemText: {
      color: '#000000',
      opacity: 0.87,
      margin: 15,
      marginLeft: 0,
      fontSize: 15,
      flexDirection:'column',
      fontWeight: 'bold',
      // textAlign: 'left',
      textAlignVertical: 'center'
    },

    menuItemIcon: {
      margin: 14,
      opacity: 0.60,
      flexDirection:'column',
      // textAlign: 'left',
    },

    container: {
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 10,
        backgroundColor: '#ffffff',
    },

    scrollView: {
      flex: 1,
      // marginTop: navHeight
    },

    listView: {
      flex: 1
    },
  // container: {
  //   flex: 1,
  //   alignItems: 'stretch',
  //   backgroundColor: '#F5FCFF',
  //   padding: 20,
  //   marginTop: Platform.OS === 'android' ? 56 : 0,
  // },
  row: {
    flexDirection: 'row',
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 7, marginRight: 7,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 10, marginBottom: 20,
  },
  legendLabel: {
    textAlign: 'center',
    color: '#666666',
    marginTop: 10, marginBottom: 20,
    fontSize: 12,
    fontWeight: '300',
  },

    fabView: {
      elevation: 12,
      position: 'absolute',
      bottom: 0,
      right: 0
    },

    fab: {
      height: 56,
      width: 56,
      marginBottom: 24,
      marginRight: 24
    },


    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },

    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        alignSelf: 'stretch',
        justifyContent: 'center'
    },

    saveButton: {
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
    },

    newButton: {
        marginBottom: 0,
        borderRadius: 0,
    },

    todo: {
        marginTop: 100,
        flex: 1,
        padding: 10,
        backgroundColor: '#ffffff',
    },

    txt: {
        fontSize: 18,
        marginLeft: 5,
        marginTop: 2,
        color: '#222222',
    },

    completed: {
        color: '#cccccc'
    },

    date: {
        marginTop: 5,
        // marginRight: 5,
        textAlign: 'right'
    },

    hr: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        height: 1,
        marginLeft: 0,
        marginRight: 0,
    }

});


module.exports = styles;
