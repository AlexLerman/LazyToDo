'use strict';
var styles = require('./application/styles/styles');
var ToDoListContainer = require('./application/components/ToDoListContainer');
var React = require('react-native');
var { AppRegistry, Navigator, Text, Image, View, TouchableHighlight, DrawerLayoutAndroid} = React;





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

class ToDoApp extends React.Component {



    renderScene(route, navigator) {
      var route_id = route.title

      console.log("Route title: "+route_id)
      switch (route_id){
        case "Today":
          return <route.component navigator={navigator} title= {route_id} {...route.passProps} />
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
        return () => {}
      }
      return Navigator.SceneConfigs.FadeAndroid
    }

    render() {

      return (
          <Navigator
            configureScene={ this.configureScene }
            initialRoute={{component: ToDoListContainer, name: 'ToDos', title: "Today", id: "Today", index: 0}}
            renderScene={ this.renderScene }
          />
      );
    }
}

AppRegistry.registerComponent('ToDoApp', () => ToDoApp);
