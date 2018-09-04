import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { ListItem, ActionButton } from "react-native-material-ui";
import { differenceInDays } from "date-fns";
import { withNavigation } from "react-navigation";

const mapStateToProps = (state, nextOwnProps) => state;

const enhance = compose(
  connect(mapStateToProps),
  withNavigation
);

const TodayIndex = enhance(({ diary, navigation }) => {
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
                navigation.navigate("TodayDiary");
              }}
            />
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
});

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

export default TodayIndex;
