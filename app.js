'use strict';
var styles = require('./application/styles/styles');
var ToDoListContainer = require('./application/components/ToDoListContainer');
var Transitions = require('./application/components/Transitions');
console.log(Transitions)
console.log(Transitions.default)

var React = require('react-native');
var { AppRegistry, Navigator, Text, Image, View, TouchableOpacity, TouchableHighlight, DrawerLayoutAndroid, BackAndroid, StatusBar} = React;
var {MKColor} = require('react-native-material-kit');





var NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    // if (index === 0) {
    //   return null;
    // }
    //
    // var previousRoute = navState.routeStack[index - 1];
    // return ( null
    //   // <TouchableOpacity
    //   //   onPress={() => navigator.pop()}
    //   //   style={styles.navBarLeftButton}>
    //   //   <Text style={[styles.navBarText, styles.navBarButtonText]}>
    //   //     Back
    //   //   </Text>
    //   // </TouchableOpacity>
    // );
    return (
      <TouchableHighlight
        // onPress = {this.refs['DRAWER'].openDrawer()}
        style={styles.menuButton}>
       <Image pointerEvents="none" source={require('./application/ic_menu_white_48dp.png')} style={{width: 24, height: 24}}/>
      </TouchableHighlight>
    )
  },

  RightButton: function(route, navigator, index, navState) {
    return null
    //  (
    //   <TouchableOpacity
    //     onPress={() => navigator.push(newRandomRoute())}
    //     style={styles.navBarRightButton}>
    //     <Text style={[styles.navBarText, styles.navBarButtonText]}>
    //       Next
    //     </Text>
    //   </TouchableOpacity>
    // );
  },

  Title: function(route, navigator, index, navState) {
    return (
      <View>
        <Text style={styles.navBarText}>
          {route.title}
        </Text>
      </View>
    );
  },

};

var _navigator; // we fill this up upon on first navigation.
var selected = "Today"
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (!_navigator || _navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});

class ToDoApp extends React.Component {

    constructor(){
      super();
      this.state = {selected: "Today"}
    }

    renderScene(route, navigator) {
      _navigator = navigator
      var route_id = route.title
      // selected = route_id
      console.log("Route title: "+route_id)
      switch (route_id){
        case "Today":
          return (
            <View style={{flex:1}}>
              <StatusBar hidden={route.statusBarHidden} />
              <route.component navigator={navigator} title= {route_id} {...route.passProps} />
            </View>
          )
        case "All":
          return <route.component navigator={navigator} title= {route_id} {...route.passProps} />
        case "Tomorrow":
          return <route.component navigator={navigator} title= {route_id} {...route.passProps} />
        case "Completed":
          return <route.component navigator={navigator} title= {route_id} {...route.passProps} />
        default:
          return <route.component navigator={navigator} title= {"KillingmeSmalls"} {...route.passProps} />

      }
    }

    configureScene(route, routeStack){
      if (route.title === "Today" || route.title === "Tomorrow" || route.title === "All" || route.title === "Completed"){
        return Transitions.default.none
      }
      return Navigator.SceneConfigs.FadeAndroid
    }

    navigate(route_id){
      this.setState({selected: route_id})
      this._navigator.push({
                  title: route_id,
                  component: ToDoListContainer,
                  passProps: {navigator: this._navigator, id: route_id, drawer: this.refs['DRAWER'], selected: route_id }
      });
      this.refs['DRAWER'].closeDrawer()

    }


    render() {

      var navigationView = (
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={{height: 100, backgroundColor: MKColor.DeepPurple}}>
              <Text style={{fontSize: 30, color: '#fff', marginTop: 33, marginLeft: 14}}>LazyToDo</Text>
            </View>
            <TouchableOpacity style={[styles.menuItem, this.state.selected === "All" && styles.selected]} onPress={this.navigate.bind(this, "All")} >
                <Image source={require('./application/images/ic_inbox_black_24dp_1x.png')} pointerEvents="none" style={styles.menuItemIcon}/>
                <Text style={styles.menuItemText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={[styles.menuItem, this.state.selected === "Today" && styles.selected]} onPress={this.navigate.bind(this, "Today")}>
                <Image source={require('./application/images/ic_today_black_24dp_1x.png')} pointerEvents="none" style={styles.menuItemIcon}/>
                <Text style={styles.menuItemText}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={[styles.menuItem, this.state.selected === "Tomorrow" && styles.selected]} onPress={this.navigate.bind(this, "Tomorrow")}>
                <Image source={require('./application/images/ic_redo_black_24dp_1x.png')} pointerEvents="none" style={styles.menuItemIcon}/>
                <Text style={styles.menuItemText}>Tomorrow</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={[styles.menuItem, this.state.selected === "Completed" && styles.selected]} onPress={this.navigate.bind(this, "Completed")}>
              <Image source={require('./application/images/ic_done_all_black_24dp_1x.png')} pointerEvents="none" style={styles.menuItemIcon}/>
              <Text style={styles.menuItemText}>Completed</Text>
            </TouchableOpacity>
          </View>
      );
      return (
        <View style={{flex:1}}>
          <StatusBar
            backgroundColor= '#512DA8'
            barStyle="light-content"
          />
          <DrawerLayoutAndroid
            drawerWidth={300}
            ref={'DRAWER'}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={() => navigationView}>
            <Navigator
              ref={(ref) => this._navigator = ref}
              configureScene={ this.configureScene }
              initialRoute={{component: ToDoListContainer, name: 'ToDos', title: "Today", id: "Today", index: 0}}
              renderScene={ this.renderScene }
            />
          </DrawerLayoutAndroid>
        </View>
      );
    }
}

AppRegistry.registerComponent('ToDoApp', () => ToDoApp);
