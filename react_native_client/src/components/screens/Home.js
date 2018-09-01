import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, StyleSheet, AsyncStorage } from "react-native";
import { Button, Card } from "react-native-material-ui";
import { userActions } from "../../actions";

const mapStateToProps = (state, nextOwnProps) => state;

class Home extends Component {
  static navigationOptions = {
    title: "Welcome to One Line Diary!"
  };

  _onSignOut = () => {
    this.props.dispatch(userActions.signOutUser());
    this.props.navigation.navigate("Auth");
  };

  render() {
    return (
      <View style={styles.container}>
        <Button primary text="Sign Out" onPress={this._onSignOut} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});

export default connect(mapStateToProps)(Home);
