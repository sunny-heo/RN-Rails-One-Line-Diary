import React, { Component } from "react";
import { Alert, Animated, Text, View, StyleSheet } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { withNavigation } from "react-navigation";

const actionItems = {
  Decline: { icon: "md-remove-circle", handler: "_handleOnDecline" },
  Confirm: { icon: "md-add-circle", handler: "_handleOnConfirm" }
};

class IncomingReqSwipeable extends Component {
  _handleOnDecline = () => {
    const { incomingReq, declineReq } = this.props;
    this.close();
    Alert.alert(
      "Decline",
      `Do you want to decline ${
        incomingReq.request_sender.first_name
      }'s request?`,
      [
        {
          text: "Yes",
          onPress: () => declineReq(incomingReq.id)
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ],
      { cancelable: true }
    );
  };
  _handleOnConfirm = () => {
    const { incomingReq, confirmReq } = this.props;
    this.close();
    confirmReq(incomingReq.id);
  };

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
    const { icon, handler } = actionItems[text];
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={this[handler]}
        >
          <Icon name={icon} size={35} style={styles.actionIcon} />
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  renderRightActions = progress => (
    <View style={{ width: 192, flexDirection: "row" }}>
      {/* {this.renderRightAction("More", "#C8C7CD", 192, progress)} */}
      {this.renderRightAction("Confirm", "#17c4db", 128, progress)}
      {this.renderRightAction("Decline", "#dd2c00", 64, progress)}
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

export default withNavigation(IncomingReqSwipeable);
