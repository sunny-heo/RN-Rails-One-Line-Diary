import React, { Component } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { View, Text, Alert, StyleSheet } from "react-native";
import { ListItem, ActionButton, Icon } from "react-native-material-ui";
import { DiarySwipeable } from "../gestures";
import { differenceInDays } from "date-fns";
import { withNavigation } from "react-navigation";
import { FlatList } from "react-native-gesture-handler";

const mapStateToProps = (state, nextOwnProps) => state;

const Row = ({ item, navigation }) => (
  <ListItem
    divider
    rightElement={
      <Text style={styles.rightElementText}>
        {`Disclose in ${differenceInDays(item.disclose_date, new Date())} days`}
      </Text>
    }
    centerElement={{
      primaryText: item.name,
      secondaryText: "with [friends' name]",
      tertiaryText: "tertiary"
    }}
    onPress={() => {
      navigation.navigate("TodayDiary");
    }}
  />
);

class TodayIndex extends Component {
  constructor() {
    super();
  }

  render() {
    const { diary, navigation, dispatch } = this.props;

    return (
      <View style={styles.root}>
        <FlatList
          data={diary.data}
          renderItem={({ item }) => {
            return (
              <DiarySwipeable
                diary={item}
                navigation={navigation}
                dispatch={dispatch}
              >
                <Row item={item} navigation={navigation} />
              </DiarySwipeable>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        <ActionButton
          onPress={() => {
            navigation.navigate("DiaryNew");
          }}
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
  rightElementText: {
    marginRight: 16,
    height: 55,
    color: "rgb(117, 117, 117)"
  }
});

export default connect(mapStateToProps)(withNavigation(TodayIndex));
