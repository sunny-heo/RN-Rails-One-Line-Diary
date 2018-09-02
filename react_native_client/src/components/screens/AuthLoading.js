import React from "react";
import { connect } from "react-redux";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import { userActions } from "../../actions";

const mapStateToProps = (state, nextOwnProps) => state;

class AuthLoading extends React.Component {
  componentDidMount() {
    const { dispatch, user, navigation } = this.props;
    console.log(dispatch(userActions.currentUser()));

    navigation.navigate(user.signedIn ? "App" : "Auth");
  }
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default connect(mapStateToProps)(AuthLoading);
