'use strict';
var styles = require('../styles/styles');
var React = require('react-native');
var ToDoListItem = require('./ToDoListItem');
var { ListView, View } = React;
var MK = require('react-native-material-kit')
var _ = require('underscore')

var { Text, Image, View, ListView, TouchableHighlight, AsyncStorage, AlertIOS, BackAndroid } = React;

const {
  MKButton,
  MKColor,
} = MK;


const ColoredFab = MKButton.coloredFab().withStyle(styles.fab).build();


class ToDoList extends React.Component {

    componentWillMount() {
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
    }

    render() {
        var dataSource = this.dataSource.cloneWithRows(this.props.items);
        return (
            <ListView
              enableEmptySections={true}
              dataSource={dataSource}
              renderRow={(rowData, sectionID, rowID) =>
                <ToDoListItem item={rowData}
                  onPress={() => this.props.onPressItem(rowData, rowID)}
                  onLongPress={() => this.props.onLongPressItem(rowData, rowID)} />
              }
              style={styles.listView}
            />
        );
    }

}


module.exports = ToDoList;
