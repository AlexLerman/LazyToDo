'use strict';
var styles = require('../styles/styles');
var React = require('react-native');
var ToDoList = require('./ToDoList');
var ToDoEdit = require('./ToDoEdit');
var MK = require('react-native-material-kit')
var _ = require('underscore')

var { Text, Image, View, ListView, TouchableHighlight, TouchableOpacity, AsyncStorage, AlertIOS, BackAndroid, ToolbarAndroid, DrawerLayoutAndroid } = React;

const {
  MKButton,
  MKColor,
} = MK;

function dateReviver(key, value) {
  if (typeof value === 'string') {
    var a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
    if (a) {
      return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
    }
  }
  return value;
};


const ColoredFab = MKButton.coloredFab().withStyle(styles.fab).build();

const TODOLIST = "TODOLIST"


var _navigator = null; // we fill this up upon on first navigation.

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (!_navigator || _navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});

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
          items[index] = item;
        }
        else {
          items.push(item)
        }
        items.sort(function(a,b){
          return a.endDate - b.endDate;
        });
        // this.setState({items: items});
        this._onValueChange(items)
        this.props.navigator.pop();
    }

    openItem(rowData, rowID) {
        _navigator = this.props.navigator
        this.props.navigator.push({
            title: rowData && rowData.txt || 'New Item',
            component: ToDoEdit,
            passProps: {navigator: _navigator, item: rowData, id: rowID, update: this.updateItem}
        });
    }

    filterItems(i){
      if (i.startDate !== null && i.startDate !== undefined){
        return today >= i.startDate.roundedDay() && today <= i.endDate.roundedDay()
      }else{
        return true
      }
    }

    getItems(filter){
      // console.log(this.state.items)
      console.log("Get Items: "+filter)
      switch (filter){
        case "Today":
          var today = (new Date()).roundedDay()
          var filtered = _.filter(this.state.items, function(i){
            if (i.startDate !== null && i.startDate !== undefined){
              return today >= i.startDate.roundedDay() && today <= i.endDate.roundedDay() && !i.complete
            }else{
              return true
            }
          })
          return filtered
        case "All":
          return this.state.items
        case "Tomorrow":
          var today = (new Date()).addDays(1).roundedDay()
          var filtered = _.filter(this.state.items, function(i){
            if (i.startDate !== null && i.startDate !== undefined){
              return today >= i.startDate.roundedDay() && today <= i.endDate.roundedDay() && !i.complete
            }else{
              return true
            }
          })
          return filtered
        case "Completed":
          var filtered = _.where(this.state.items, {complete: true})
          console.log(filtered)
          return filtered
      }
    }

    onActionSelected() {
      // if (position === 0) { // index of 'Settings'
      this.refs['DRAWER'].openDrawer()
      // }
    }

    navigate(route_id){
      console.log("navigate: " +  route_id)
      this.refs['DRAWER'].closeDrawer()
      this.props.navigator.push({
                  title: route_id,
                  component: ToDoContainer,
                  passProps: {navigator: _navigator, id: route_id}
      });
      // this.props.navigator.push({id: route_id})
    }
    // style = {styles.toolbar}
    // title="Today"
    // actions={[{title: 'Drawer', icon: require('../ic_menu_white_48dp.png'), show: 'always'}]}
    // onActionSelected={this.onActionSelected}

                  // actions={[{title: 'Drawer', icon: require('../ic_menu_white_24dp.png'), show: 'always'}]}
                  // onActionSelected={this.onActionSelected}
//
// onPress={}
// onPress={this.props.navigator.push({id: "Inbox"})}
// _navigator = this.props.navigator
// <TouchableHighlight>
//   <Image source={require('../ic_menu_white_48dp.png')} style={styles.menuButton} />
// </TouchableHighlight>
    render() {
      _navigator = this.props.navigator

      var navigationView = (
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <TouchableOpacity onPress={this.navigate.bind(this, "All")} >
                <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>Inbox</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.navigate.bind(this, "Today")}>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.navigate.bind(this, "Tomorrow")}>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>Tomorrow</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.navigate.bind(this, "Completed")}>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>Completed</Text>
            </TouchableOpacity>
          </View>
      );
        return (
          <DrawerLayoutAndroid
            drawerWidth={300}
            ref={'DRAWER'}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={() => navigationView}>
            <View style={{flex: 1}}>
              <ToolbarAndroid style={styles.navigator }
                navIcon={require('../ic_menu_white_24dp/web/ic_menu_white_24dp_1x.png')}
                titleColor='#FFFFFF'
                title={this.props.title}
                contentInsetStart={72}
                onIconClicked={this.onActionSelected.bind(this)}
              >

              </ToolbarAndroid>

              <View style={styles.scrollView}>
                    <ToDoList
                      items={this.getItems(this.props.title)}
                      onPressItem={this.openItem}
                      onLongPressItem={this.alertMenu}
                      style={styles.scrollView}
                    />
              </View>

            </View>
            <View style={styles.fabView}>
              <ColoredFab
              onPress={this.openItem}>
                <Image pointerEvents="none" source={require('../plus.png')} style={{height: 24, width: 24}}/>
              </ColoredFab>
            </View>
          </DrawerLayoutAndroid>
        );
    }


}

// <TouchableHighlight
//     style={[styles.button, styles.newButton]}
//     underlayColor='#99d9f4'
//     onPress={this.openItem}>
//     <Text style={styles.buttonText}>+</Text>
// </TouchableHighlight>




module.exports = ToDoContainer;
