'use strict';
var styles = require('./application/styles/styles');
var ToDoListContainer = require('./application/components/ToDoListContainer');
var React = require('react-native');
var { AppRegistry, Navigator } = React;

class ToDoApp extends React.Component {

    renderScene(route, navigator) {
      return <route.component navigator={navigator} {...route.passProps} />
    }

    configureScene(route, routeStack){
      return Navigator.SceneConfigs.PushFromRight
    }

    render() {
        return (
            <Navigator
              configureScene={ this.configureScene }
              style={styles.navigator}
              initialRoute={{component: ToDoListContainer, name: 'To Dos', index: 0}}
              renderScene={ this.renderScene }
            />

        );
    }
}

AppRegistry.registerComponent('ToDoApp', () => ToDoApp);
