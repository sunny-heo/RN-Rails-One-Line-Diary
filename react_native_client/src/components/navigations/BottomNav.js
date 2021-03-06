import React, { Component } from "react";
import { BottomNavigation } from "react-native-material-ui";

class BottomNav extends Component {
  render() {
    const { onPressBotNavItem, active } = this.props;
    return (
      <BottomNavigation active={active} hidden={false}>
        <BottomNavigation.Action
          key="today"
          icon="today"
          label="Today"
          onPress={onPressBotNavItem("today")}
        />
        <BottomNavigation.Action
          key="friends"
          icon="people"
          label="Friends"
          onPress={onPressBotNavItem("friends")}
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
