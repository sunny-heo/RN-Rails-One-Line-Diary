import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, StyleSheet, AsyncStorage } from "react-native";
import { Button, Card } from "react-native-material-ui";
import { userActions } from "../../actions";

const mapStateToProps = (state, nextOwnProps) => state;

class Home extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }
  async componentDidMount() {
    // const user =
    const user = JSON.parse(await AsyncStorage.getItem("userData"));
    this.setState({ user });
    console.log(user);
  }
  render() {
    return (
      <View style={styles.container}>
        <Button
          primary
          text="Sign In"
          onPress={() => this.props.navigation.navigate("SignIn")}
        />
        <Button
          primary
          text="Sign Out"
          onPress={() => this.props.dispatch(userActions.signOutUser())}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center"
  }
});

export default connect(mapStateToProps)(Home);
