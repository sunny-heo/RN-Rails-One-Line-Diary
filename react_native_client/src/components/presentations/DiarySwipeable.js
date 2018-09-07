import React, { Component } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

import { RectButton, Swipeable } from "react-native-gesture-handler";
// import { Icon } from "react-native-material-ui";
// import Icon from "react-natvie-vector-icons/";
import Icon from "react-native-vector-icons/MaterialIcons";

const icons = {
  Delete: "delete-forever",
  Edit: "edit"
};

class DiarySwipeable extends Component {
  renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1]
    });
    return (
      <RectButton style={styles.leftAction} onPress={this.close}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }]
            }
          ]}
        >
          Skip
        </Animated.Text>
      </RectButton>
    );
  };
  renderRightAction = (text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0]
    });
    const pressHandler = () => {
      this.close();
      alert(text);
    };
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}
        >
          <Icon name={icons[text]} size={35} style={styles.actionIcon} />
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  renderRightActions = progress => (
    <View style={{ width: 192, flexDirection: "row" }}>
      {/* {this.renderRightAction("More", "#C8C7CD", 192, progress)} */}
      {this.renderRightAction("Edit", "#ffab00", 128, progress)}
      {this.renderRightAction("Delete", "#dd2c00", 64, progress)}
    </View>
  );
  updateRef = ref => {
    this._swipeableRow = ref;
  };
  close = () => {
    this._swipeableRow.close();
  };
  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        leftThreshold={30}
        rightThreshold={40}
        renderLeftActions={this.renderLeftActions}
        renderRightActions={this.renderRightActions}
      >
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: "#497AFC",
    justifyContent: "center"
  },
  actionText: {
    color: "white",
    fontSize: 12,
    backgroundColor: "transparent"
  },
  actionIcon: {
    color: "white",
    backgroundColor: "transparent"
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  }
});

export default DiarySwipeable;
