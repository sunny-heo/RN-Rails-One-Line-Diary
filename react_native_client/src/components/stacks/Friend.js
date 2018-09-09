import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Subheader } from "react-native-material-ui";
class Friend extends Component {
  render() {
    return (
      <View style={styles.root}>
        <Subheader text="People" />
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
export default Friend;
