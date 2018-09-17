import React, { Component } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { differenceInDays, format } from "date-fns";

import {
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import { SearchBar } from "../../customSearchBar";

const mapStateToProps = (state, nextOwnProps) => state;

class FriendNew extends Component {
  constructor() {
    super();
    this.state = { text: "" };
  }
  onChangeText = text => {
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => this.setState({ text }), 1000);
  };

  render() {
    return (
      <View style={styles.root}>
        <SearchBar
          onChangeText={this.onChangeText}
          onPressCancel={() => console.log("pressed")}
        />
        {/* <Text>{this.state.text}</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgb(255, 255, 255)",
    padding: 16
  }
});

export default connect(mapStateToProps)(FriendNew);
