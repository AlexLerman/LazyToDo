'use strict';
var styles = require('../styles/styles');
var React = require('react-native');
var ToDoList = require('./ToDoList');
var ToDoEdit = require('./ToDoEdit');
var { Text, View, ListView, TouchableHighlight, AsyncStorage, AlertIOS } = React;

function dateReviver(key, value) {
  if (typeof value === 'string') {
    var a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
    if (a) {
      return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
    }
  }
  return value;
};

const TODOLIST = "TODOLIST"

class ToDoContainer extends React.Component {

    componentDidMount() {
      this._loadInitialState().done();
    }

    async _loadInitialState() {
      try {
        var list = await AsyncStorage.getItem(TODOLIST);
        if (list !== null){
          list= JSON.parse(list, dateReviver)
          this.setState({items: list});
          this._appendMessage('Recovered selection from disk: ' + list);
        } else {
          // this.setState({items: []});
          this._appendMessage('Initialized with no selection on disk.');
        }
      } catch (error) {
        this._appendMessage('AsyncStorage error: ' + error.message);
      }
    }


    _appendMessage(message) {
      this.setState({messages: this.state.messages.concat(message)});
    }

    async _onValueChange(items) {
      this.setState({items: items});
      try {
        items = JSON.stringify(items)
        await AsyncStorage.setItem(TODOLIST, items);
        this._appendMessage('Saved selection to disk: ' + items);
      } catch (error) {
        this._appendMessage('AsyncStorage error: ' + error.message);
      }
    }


    constructor() {
        super();
        this.state = {
          items: [], //{txt: 'New Item', complete: false}
          messages: []
        }
        this.alertMenu = this.alertMenu.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.openItem = this.openItem.bind(this);

    }

    alertMenu(rowData, rowID) {
        AlertIOS.alert(
            'Quick Menu',
            null,
            [
                {text: 'Delete', onPress: () => this.deleteItem(rowID)},
                {text: 'Edit', onPress: () => this.openItem(rowData, rowID)},
                {text: 'Cancel'}
            ]
        )
    }

    deleteItem(index) {
        var items = this.state.items;
        items.splice(index, 1);
        this._onValueChange(items)
    }

    updateItem(item, index) {
        var items = this.state.items;
        if (index) {
          if (item.complete){
            this.deleteItem(index)
          }else{
            items[index] = item;
          }
        }
        else {
          if (!item.complete){
            items.push(item)
          }
        }
        items.sort(function(a,b){
          return a.date - b.date;
        });
        // this.setState({items: items});
        this._onValueChange(items)
        this.props.navigator.pop();
    }

    openItem(rowData, rowID) {
        this.props.navigator.push({
            title: rowData && rowData.txt || 'New Item',
            component: ToDoEdit,
            passProps: {item: rowData, id: rowID, update: this.updateItem}
        });
    }

    render() {
        return (
            <View style={{flex:1}}>
                <ToDoList
                    items={this.state.items}
                    onPressItem={this.openItem}
                    onLongPressItem={this.alertMenu}/>
                <TouchableHighlight
                    style={[styles.button, styles.newButton]}
                    underlayColor='#99d9f4'
                    onPress={this.openItem}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

module.exports = ToDoContainer;
