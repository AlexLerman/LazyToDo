'use strict';
var styles = require('../styles/styles');
var React = require('react-native');
var { Text, View, TouchableHighlight } = React;

var month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(start, end){
  if (end !== undefined){
    if (end.toDateString() === (new Date()).toDateString()){
      return "today"
    }
    if ((start.roundedDay() - end.roundedDay()) == 0){
      return "on " + month_names_short[end.getMonth()] + ' ' + end.getDate()
    }
    console.log(start)
    console.log(end)
    console.log(start.roundedDay()- end.roundedDay())

    return "by " + month_names_short[end.getMonth()] + ' ' + end.getDate()
  }
  return ""
}


Date.prototype.roundedDay = function() {
    var day = new Date(this.valueOf());

    return new Date(day.getFullYear(), day.getMonth(), day.getDate());
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
                        <Text style={styles.date}> Due {formatDate(item.startDate, item.endDate)}</Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.hr}/>
            </View>
        );
    }
}

module.exports = ToDoListItem;
