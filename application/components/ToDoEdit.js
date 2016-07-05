'use strict';
var styles = require('../styles/styles');
var React = require('react-native');
var _ = require('underscore')
var t = require('tcomb-form-native');
var { View, TouchableHighlight, Text, DatePickerAndroid } = React;
var Form = t.form.Form;


var DateType = t.enums({
  Today: "Today",
  Tomorrow: "Tomorrow",
  ThisWeek: "This week",
  ThisMonth: "This Month",
  SelectDate: 'Select Date'
});

var oldDatetype = null
var selectedDate = new Date()

var ToDo = t.struct({txt: t.Str, complete: t.Bool, datetype: DateType});

Date.prototype.addDays = function(days)
{
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}


var options = {
    fields: {
        txt: {
            label: 'To-Do Item',
            placeholder: 'enter a to do item here',
            autoFocus: true
        },
        date: {
            label: 'Date',
            mode: 'date',
            minimumDate: new Date(),
            config: {
              format: (date) => ((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear())
            }
        },
        datetype: {
          label: "Date",
          placeholder: 'Today'
        }
    }
};


function convertDate(realvalue, date){
  var value = _.clone(realvalue)
  console.log(value.datetype)
  switch(value.datetype){
    case "Today":
      value.startDate = new Date()
      value.endDate = new Date()
      break
    case "Tomorrow":
      value.startDate = (new Date()).addDays(1)
      value.endDate = (new Date()).addDays(1)
      break
    case 'ThisWeek':
      value.startDate = new Date()
      value.endDate = (new Date()).addDays(7)
      break
    case 'ThisMonth':
      value.startDate = new Date()
      value.endDate = (new Date()).addDays(30)
      break
    case 'SelectDate':
      value.startDate = date
      value.endDate = date
      break
  }

  return value
}


class ToDoEdit extends React.Component {
    constructor() {
        super();
        this.state = {date: new Date()};
        this.onUpdate = this.onUpdate.bind(this);
        this.updateSelectDate = this.updateSelectDate.bind(this);

        // this._displayDate = this._displayDate.bind(this);
    }

    onUpdate() {
        var value = this.refs.form.getValue();

        if (value) {
            console.log(this.state.date)
            var to_save = convertDate(value, selectedDate)
            this.props.update(to_save, this.props.id);
        }
    }

    updateSelectDate(){
      // var value = this.refs.form.getValue();
      // if (value.datetype === "SelectDate"){
        this.setState({selectDate: true});
      // }else{
      //   this.setState({selectDate: false});
      // }

    }


    _onChange(value){
      console.log("on change")
      console.log(value.datetype === "SelectDate")
      console.log(oldDatetype);
      if (value.datetype === "SelectDate" && oldDatetype !== "SelectDate"){
        oldDatetype = DateType.SelectDate
        this.openPicker('min', {
          date: selectedDate,
          minDate: new Date()
        })
      }
      if (value.datetype !== "SelectDate"){
        oldDatetype = null
      }
      // return value
    }

    _displayDate(){
      if (this.state.selectDate){
        return (<DatePickerIOS mode = "date" date={new Date(this.state.date)} />)
      }
      return null
    }

    async openPicker(stateKey, options){
      try {
        const {action, year, month, day} = await DatePickerAndroid.open(options);
        if (action !== DatePickerAndroid.dismissedAction) {
          var date = new Date(year, month, day);
          console.log(this.state)
          selectedDate = date
          // this.setState({date: date})
          console.log(this.state)
        }

      } catch ({code, message}) {
        console.warn('Cannot open date picker', message);
      }
    }

    render() {
        oldDatetype = this.props.item.datetype
        selectedDate = this.props.item.endDate || new Date()
        return (
            <View style={styles.todo}>
                <Form
                    ref="form"
                    type={ToDo}
                    onChange={this._onChange.bind(this)}
                    options={options}
                    value={this.props.item}/>
                <TouchableHighlight
                    style={[styles.button, styles.saveButton, {marginBottom: 4}]}
                    onPress={this.onUpdate}
                    underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

// <TouchableHighlight
//     style={[styles.button, styles.saveButton]}
//     onPress={this.openPicker.bind(this, 'min', {
//       date: this.state.date,
//       minDate: new Date()
//     })}
//     underlayColor='#99d9f4'>
//     <Text style={styles.buttonText}>Select Date</Text>
// </TouchableHighlight>


module.exports = ToDoEdit;
