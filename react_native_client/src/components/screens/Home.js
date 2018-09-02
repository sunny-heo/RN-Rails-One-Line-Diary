import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, StyleSheet, AsyncStorage } from "react-native";
import { Button, IconToggle } from "react-native-material-ui";
import { userActions } from "../../actions";
import { BottomNav } from "../navigations";
import { Today, People, Diaries, Settings } from "../stacks";
import { TodayIndex } from "../presentations";

const mapStateToProps = (state, nextOwnProps) => state;

const Presentation = ({ active }) => {
  switch (active) {
    case "today":
      return <Today />;
    case "people":
      return <People />;
    case "diaries":
      return <Diaries />;
    case "settings":
      return <Settings />;
    default:
      return <Today />;
  }
};

class Home extends Component {
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
  state = { active: "today" };

  _onSignOut = () => {
    this.props.dispatch(userActions.signOutUser());
    this.props.navigation.navigate("Auth");
  };

  onPressBotNavItem = props => () => {
    this.setState({ active: props });
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <Button raised primary text="Sign Out" onPress={this._onSignOut} /> */}

        {/* <Presentation active={this.state.active} /> */}
        <TodayIndex />

        <BottomNav
          active={this.state.active}
          onPressBotNavItem={this.onPressBotNavItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start"
    // alignItems: "flex-start"
  },

  settingsBtn: {
    // alignText: "center"
    color: "red"
  }
});

export default connect(mapStateToProps)(Home);
