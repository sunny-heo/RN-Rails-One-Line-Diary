import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, StyleSheet, AsyncStorage } from "react-native";
import { Button, IconToggle } from "react-native-material-ui";
import { userActions } from "../../actions";
import { BottomNav } from "../navigations";
import { Today, People, Diaries, Settings } from "../presentations";

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
  state = { active: "" };

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
        <View style={styles.presentation}>
          {<Presentation active={this.state.active} />}
        </View>
        <View style={styles.bottomNav}>
          <BottomNav
            active={this.state.active}
            onPressBotNavItem={this.onPressBotNavItem}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  presentation: {
    // backgroundColor: "black",
    flex: 1
  },
  bottomNav: {},

  settingsBtn: {
    // alignText: "center"
    color: "red"
  }
});

export default connect(mapStateToProps)(Home);
