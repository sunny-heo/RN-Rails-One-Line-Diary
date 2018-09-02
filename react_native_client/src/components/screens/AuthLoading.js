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
  async componentDidMount() {
    try {
      const { currentUser } = userActions;
      await this.props.dispatch(currentUser());

      const { user, navigation } = this.props;
      navigation.navigate(user.signedIn ? "App" : "Auth");
    } catch (error) {
      console.log(error);
    }
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
