import React, { Component, Fragment } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { Subheader, ListItem, Divider } from "react-native-material-ui";
import { TextField } from "react-native-material-textfield";
import { differenceInDays } from "date-fns";

class Diaries extends Component {
  sampleDiary = Array(20)
    .fill()
    .map((e, i) => {
      return {
        title: "whatever",
        content: "How are you today?",
        timeStamp: new Date() - i * 1000000000
      };
    });

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.textContainer}>
          <TextField
            // ref={this.emailRef}
            label="What one word describes your day today?"
            // value={email}
            keyboardType="email-address"
            maxLength={20}
            characterRestriction={15}
            // _onChangeText={this._onChangeText}
            // onSubmitEditing={this._onSubmitEmail}
            autoCapitalize="none"
            style={{ marginBottom: 0 }}
            // error={errors.email}
          />
          <TextField
            // ref={this.emailRef}
            label="How was your day?"
            // value={email}
            keyboardType="email-address"
            maxLength={60}
            characterRestriction={50}
            // _onChangeText={this._onChangeText}
            // onSubmitEditing={this._onSubmitEmail}
            autoCapitalize="none"
            // error={errors.email}
          />
        </View>
        <Divider />
        <FlatList
          data={this.sampleDiary}
          renderItem={({ item }) => {
            return (
              <ListItem
                divider
                leftElement={
                  <Text>
                    {`${differenceInDays(new Date(), item.timeStamp)}days`}
                  </Text>
                }
                centerElement={{
                  primaryText: item.content
                  // secondaryText: item.timeStamp
                  // secondaryText: item.timeStamp
                  // tertiaryText: item.timeStamp
                }}
                // rightElement={}
                onPress={() => {}}
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
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
export default Diaries;
