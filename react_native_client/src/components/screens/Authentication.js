import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform, StyleSheet, Text, View } from "react-native";
import { userActions } from "../../actions";

const mapStateToProps = (state, nextOwnProps) => state;

class Home extends Component {
  componentDidMount() {
    console.log(this.props);
    // const { signInUser } = userActions;
    // console.log(userActions);
    // const { dispatch } = this.props;
    // dispatch(
    //   signInUser({
    //     email: "sunny@gmail.com",
    //     password: "superSecret1@"
    //   })
    // );
  }
  render() {
    return (
      <View>
        <Text>Hello world</Text>
      </View>
    );
  }
}

export default connect(mapStateToProps)(Home);
