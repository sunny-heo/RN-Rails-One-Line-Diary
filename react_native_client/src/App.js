import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import { Provider } from "react-redux";
import { COLOR, ThemeContext, getTheme } from "react-native-material-ui";
import store from "./store";
import RootStack from "./components/RootStack";

const uiTheme = {
  palette: {
    // primaryColor: COLOR.green500
  }
};

class App extends Component {
  render() {
    return (
      <Provider store={store()}>
        <ThemeContext.Provider value={getTheme(uiTheme)}>
          <RootStack />
        </ThemeContext.Provider>
      </Provider>
    );
  }
}

export default App;
