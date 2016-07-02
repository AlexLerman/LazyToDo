'use strict';
var styles = require('../styles/styles');
var React = require('react-native');
var ToDoList = require('./ToDoList');
var ToDoEdit = require('./ToDoEdit');
var { Text, View, ListView, TouchableHighlight, AsyncStorage, AlertIOS } = React;


const TODOLIST = "TODOLIST"

class ToDoContainer extends React.Component {

    componentDidMount() {
      this._loadInitialState().done();
    }

    async _loadInitialState() {
      console.log("loadInitialState")
      try {
        var list = await AsyncStorage.getItem(TODOLIST);
        console.log(list)
        if (list !== null){
          list= JSON.parse(list)
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
      console.log(items)
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
          items: [{txt: 'New Item', complete: false}],
          messages: []
        }
        console.log("constructor")
        console.log(this.state)
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
            items[index] = item;
        }
        else {
            items.push(item)
        }
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
