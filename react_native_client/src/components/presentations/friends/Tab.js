import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-material-ui";
import { compose, withState } from "recompose";

const enhance = compose(withState("active", "setActive", "Friends"));

const Tab = enhance(({ _onPressTabItem, active, setActive }) => {
  return (
    <View style={styles.root}>
      {["Friends", "Incoming", "Outgoing"].map(text => {
        const isActive = active === text;
        return (
          <View style={styles.tabWrapper} key={text}>
            <Button
              raised
              text={text}
              style={{
                container: [
                  styles.tab,
                  isActive ? styles.activeContainer : null
                ],
                text: isActive ? styles.activeText : null
              }}
              upperCase={false}
              onPress={() => {
                setActive(text);
                _onPressTabItem(text);
              }}
            />
          </View>
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 3,
    paddingVertical: 6
  },
  tabWrapper: {
    flex: 1 / 3,
    marginHorizontal: 6
  },
  tab: { backgroundColor: "#fff" },
  activeContainer: {
    backgroundColor: "#ff4081"
  },
  activeText: {
    color: "#fff"
  }
});

export default Tab;
