import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, StyleSheet, AsyncStorage } from "react-native";
import { Button, IconToggle } from "react-native-material-ui";
import { userActions } from "../../actions";
import { BottomNav } from "../navigations";
import { Today } from "../stacks";

import {
  TodayIndex,
  FriendHome,
  DiariesIndex,
  SettingsIndex
} from "../presentations";

const mapStateToProps = (state, nextOwnProps) => state;

const Presentation = ({ active }) => {
  // console.log(active);
  switch (active) {
    case "today":
      return <TodayIndex />;
    case "friends":
      return <FriendHome />;
    case "diaries":
      return <DiariesIndex />;
    case "settings":
      return <SettingsIndex />;
    default:
      return;
  }
};

class Home extends Component {
  constructor() {
    super();
    this.state = {
      active: "today"
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "One Line Diary",
      headerRight: (
        <IconToggle
          name="account-circle"
          onPress={() => navigation.navigate("Profile")}
        />
      )
    };
  };

  _navigateToProfile = () => {
    this.props.navigation.navigate("Profile");
  };

  _onSignOut = () => {
    this.props.dispatch(userActions.signOutUser());
    this.props.navigation.navigate("Auth");
  };

  onPressBotNavItem = active => () => {
    console.log(active);
    this.setState({ active });
  };

  render() {
    const { active } = this.state;
    return (
      <View style={styles.container}>
        <Presentation active={active} />
        <BottomNav active={active} onPressBotNavItem={this.onPressBotNavItem} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  presentation: {
    flex: 1
  }
});

export default connect(mapStateToProps)(Home);
