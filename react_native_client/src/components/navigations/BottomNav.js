import React, { Component } from "react";
import { BottomNavigation } from "react-native-material-ui";

class BottomNav extends Component {
  state = { active: "" };

  render() {
    const { onPressBotNavItem, active } = this.props;
    return (
      <BottomNavigation
        active={active}
        hidden={false}
        style={{ background: "transparent" }}
      >
        <BottomNavigation.Action
          key="today"
          icon="today"
          label="Today"
          onPress={onPressBotNavItem("today")}
        />
        <BottomNavigation.Action
          key="people"
          icon="people"
          label="People"
          onPress={onPressBotNavItem("people")}
        />
        <BottomNavigation.Action
          key="notes"
          icon="event-note"
          // icon="diary"
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
