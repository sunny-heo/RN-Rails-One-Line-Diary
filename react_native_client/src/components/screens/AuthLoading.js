import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from "react-native";

class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this._checkUserSignedIn();
  }

  _checkUserSignedIn = async () => {
    const userData = await AsyncStorage.getItem("userData");
    this.props.navigation.navigate(userData ? "App" : "Auth");
  };

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

export default AuthLoading;
