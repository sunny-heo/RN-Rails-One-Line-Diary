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
import { diaryActions } from "../../actions";

const mapStateToProps = (state, nextOwnProps) => state;

class TodayIndex extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { diary } = this.props;
    return (
      <View style={styles.root}>
        <FlatList
          data={diary.data}
          renderItem={({ item }) => {
            return (
              <ListItem
                divider
                rightElement={
                  <Text>
                    {`Disclose in ${differenceInDays(
                      item.disclose_date,
                      new Date()
                    )} days`}
                  </Text>
                }
                centerElement={{
                  primaryText: item.name
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
