import React, { Component, Fragment } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import {
  Subheader,
  ListItem,
  Divider,
  ActionButton
} from "react-native-material-ui";
import { TextField } from "react-native-material-textfield";
import { differenceInDays } from "date-fns";
import { withNavigation } from "react-navigation";

class PeopleIndex extends Component {
  render() {
    return (
      <View style={styles.root}>
        <Text>PeopleIndex</Text>
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
    // width: "100%",
    // alignItems: "center",
    // justifyContent: "center",
    marginLeft: 16,
    marginRight: 16
    // marginBottom: 5
  }
});
export default PeopleIndex;
