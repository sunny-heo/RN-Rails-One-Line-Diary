import React, { Component } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";

import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Picker
} from "react-native";
import { withNavigation } from "react-navigation";
import DateTimePicker from "react-native-modal-datetime-picker";

const mapStateToProps = (state, nextOwnProps) => state;

// const enhance = compose(
//   connect(mapStateToProps),
//   withNavigation
// );

class DiaryNew extends Component {
  state = {
    isDateTimePickerVisible: false,
    selectedDate: ""
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this._hideDateTimePicker();
  };

  render() {
    return (
      <View style={styles.root}>
        <TouchableOpacity onPress={this._showDateTimePicker}>
          <View style={styles.button}>
            <Text>Show DatePicker</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.text}>{this.state.selectedDate}</Text>

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode={"time"}
        />
        <Picker
          selectedValue={this.state.language}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => {
            console.log(itemValue);
            this.setState({ language: itemValue });
          }}
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgb(255, 255,255)"
  },
  textContainer: {
    marginLeft: 16,
    marginRight: 16
  }
});

export default connect(mapStateToProps)(DiaryNew);
