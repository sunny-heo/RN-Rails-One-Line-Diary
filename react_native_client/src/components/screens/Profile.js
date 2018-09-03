import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, StyleSheet, AsyncStorage } from "react-native";
import { Button, Avatar } from "react-native-material-ui";
import { userActions } from "../../actions";

const mapStateToProps = (state, nextOwnProps) => state;

class Profile extends Component {
  static navigationOptions = {
    title: "Profile"
  };

  _onSignOut = () => {
    this.props.dispatch(userActions.signOutUser());
    this.props.navigation.navigate("Auth");
  };

  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <Button raised primary text="Sign Out" onPress={this._onSignOut} />
        <Avatar text="A" iconColor="blue" size={75} />
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

export default connect(mapStateToProps)(Profile);
