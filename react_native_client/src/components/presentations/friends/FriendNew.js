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

import { Avatar, ListItem, ActionButton, Icon } from "react-native-material-ui";
import { SearchBar } from "../../customSearchBar";
import { searchActions } from "../../../actions";

import { FlatList } from "react-native-gesture-handler";

const mapStateToProps = (state, nextOwnProps) => state;
const mapDispatchToProps = dispatch => {
  return {
    searchUser: async keyword => {
      try {
        keyword && (await dispatch(searchActions.user(keyword)));
      } catch (error) {
        console.log(error);
      }
    }
  };
};

const Row = ({ user, navigation }) => {
  const { email, first_name, last_name } = user;
  return (
    <ListItem
      divider
      leftElement={
        <Avatar
          text={`${first_name[0].toUpperCase()}.${last_name[0].toUpperCase()}`}
        />
      }
      centerElement={{
        primaryText: `${first_name} ${last_name}`,
        secondaryText: email
      }}
      // onPress={() => {
      //   navigation.navigate("FriendProfile");
      // }}
    />
  );
};

class FriendNew extends Component {
  constructor() {
    super();
    this.state = { text: "" };
  }
  onChangeText = text => {
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => this.props.searchUser(text), 500);
  };

  render() {
    const { userResult } = this.props.search;
    return (
      <View style={styles.root}>
        <SearchBar
          onChangeText={this.onChangeText}
          onPressCancel={() => console.log("pressed")}
        />
        <FlatList
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.state.refreshing}
          //     onRefresh={this._onRefresh}
          //   />
          // }
          data={userResult}
          renderItem={({ item: user }) => {
            return (
              // <IncomingReqSwipeable
              //   incomingReq={incomingReq}
              //   navigation={navigation}
              //   confirmReq={confirmReq}
              //   declineReq={declineReq}
              // >
              <Row user={user} />
              // </IncomingReqSwipeable>
            );
          }}
          keyExtractor={item => item.id.toString()}
        />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendNew);
