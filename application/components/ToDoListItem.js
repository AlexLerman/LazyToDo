'use strict';
var styles = require('../styles/styles');
var React = require('react-native');
var { Text, View, TouchableHighlight } = React;

var month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(date){
  if (date !== undefined){
    return month_names_short[date.getMonth()] + ' ' + date.getDate()
  }
  return ""
}

class ToDoListItem extends React.Component {



    render() {
        var item = this.props.item;
        return (
            <View>
                <TouchableHighlight
                    onPress={this.props.onPress}
                    onLongPress={this.props.onLongPress}>
                    <View style={styles.container}>
                        <Text
                            style={[styles.txt, item.complete && styles.completed]}>
                            {item.txt}
                        </Text>
                        <Text>{formatDate(item.date)}</Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.hr}/>
            </View>
        );
    }
}

module.exports = ToDoListItem;
