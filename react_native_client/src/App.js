import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import { Provider } from "react-redux";
import store from "./store";
import { Home } from "./components/screens";

class App extends Component {
  render() {
    return (
      <Provider store={store()}>
        <Home />
      </Provider>
    );
  }
}

export default App;
