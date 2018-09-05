import React from "react";
import { connect } from "react-redux";
import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import { userActions, diaryActions } from "../../actions";

const mapStateToProps = (state, nextOwnProps) => state;

class AuthLoading extends React.Component {
  async componentDidMount() {
    try {
      await this.loadCurrentUser();

      const { user, navigation } = this.props;

      if (user.signedIn) {
        this.loadUserDiary();
      }

      navigation.navigate(user.signedIn ? "App" : "Auth");
    } catch (error) {
      console.log(error);
    }
  }

  async loadCurrentUser() {
    await this.props.dispatch(userActions.currentUser());
  }

  loadUserDiary() {
    this.props.dispatch(diaryActions.index());
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
