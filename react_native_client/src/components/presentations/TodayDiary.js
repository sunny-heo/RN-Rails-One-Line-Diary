import React, { Component, Fragment } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import {
  Subheader,
  ListItem,
  Divider,
  Button,
  ActionButton
} from "react-native-material-ui";
import { TextField } from "react-native-material-textfield";

class TodayIndex extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.root}>
        <TextField
          // ref={this.emailRef}
          label="What one word describes your day today?"
          // value={dailyTitle}
          maxLength={20}
          characterRestriction={15}
          // _onChangeText={this._onChangeText}
          // onSubmitEditing={this._onSubmitEmail}
          autoCapitalize="none"
          style={{ marginBottom: 0 }}
        />
        <TextField
          // ref={this.emailRef}
          label="How was your day?"
          // value={dailyContent}
          maxLength={60}
          characterRestriction={50}
          // _onChangeText={this._onChangeText}
          // onSubmitEditing={this._onSubmitEmail}
          autoCapitalize="none"
        />
        <View style={styles.btnContainer}>
          <Button
            primary
            raised
            text="Submit"
            style={{
              container: styles.btn
            }}
            onPress={this._onSubmit}
          />
          {/* <Button
          primary
          raised
          text="Cancel"
          style={{
            container: styles.btnContainer
          }}
          onPress={this._onSubmit}
        /> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
    justifyContent: "center"
  },
  btnContainer: {
    // width: "25%"
    // width: "100%",
    // alignItems: "center",
    // flex: 1,
    // justifyContent: "center",
    alignItems: "center"
    // marginBottom: 5
  },
  btn: {
    width: "25%"
  },
  submitBtn: {
    width: 50,
    margin: 20
  }
});
export default TodayIndex;
