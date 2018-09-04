import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
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

class TodayIndex extends Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount = () => {};

  sampleDiary = Array(20)
    .fill()
    .map((e, i) => {
      return {
        title: `${i} day diary`,
        timeStamp: new Date() - i * 1000000000
      };
    });

  render() {
    return (
      <View style={styles.root}>
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
                  primaryText: item.title
                }}
                onPress={() => {
                  this.props.navigation.navigate("TodayDiary");
                }}
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        <ActionButton />
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
export default connect(mapStateToProps)(withNavigation(TodayIndex));
