import React, { Component } from "react";
import { BottomNavigation } from "react-native-material-ui";

class BottomNav extends Component {
  state = { active: "today" };
  render() {
    const { onPressBotNavItem, active } = this.props;
    console.log(active);
    return (
      <BottomNavigation active={active} hidden={false}>
        <BottomNavigation.Action
          key="today"
          icon="today"
          label="Today"
          onPress={onPressBotNavItem("today")}
          // onPress={() => this.setState({ active: "today" })}
        />
        <BottomNavigation.Action
          key="people"
          icon="people"
          label="People"
          onPress={onPressBotNavItem("people")}
          // onPress={() => this.setState({ active: "people" })}
        />
        <BottomNavigation.Action
          key="diaries"
          icon="event-note"
          label="Diaries"
          onPress={onPressBotNavItem("diaries")}
        />
        <BottomNavigation.Action
          key="settings"
          icon="settings"
          label="Settings"
          onPress={onPressBotNavItem("settings")}
        />
      </BottomNavigation>
    );
  }
}

export default BottomNav;
