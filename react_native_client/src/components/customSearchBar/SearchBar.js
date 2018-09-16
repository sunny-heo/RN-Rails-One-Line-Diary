import React, { Component } from "react";
import { compose, withState, lifecycle, withHandlers } from "recompose";
import {
  View,
  Text,
  Keyboard,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import RF from "react-native-responsive-fontsize";

const MD_FONT_SIZE = RF(2.5);
const ICON_SIZE = RF(3);

const enhance = compose(
  withState("_text", "_setText", ""),
  withState("_textInputRef", "_setTextInputRef", null),
  withState("_keyboardDidShowListener", "_setKeyboardDidShowListener", null),
  withHandlers({
    handleOnTextChange: ({ onChangeText, _setText }) => text => {
      onChangeText(text);
      _setText(text);
    },
    _handleOnPressReset: ({ _setText }) => () => _setText(""),
    handleOnPressCancel: ({ onPressCancel }) => () => onPressCancel()
  }),
  lifecycle({
    componentDidMount() {
      const { _setKeyboardDidShowListener } = this.props;
      _setKeyboardDidShowListener(
        Keyboard.addListener("keyboardDidShow", () => {
          console.log("keyboardDidShow");
        })
      );
    },
    componentDidUpdate() {
      this.props._textInputRef.focus();
    }
  })
);
const SearchBar = enhance(
  ({
    _text,
    _setText,
    _textInputRef,
    onChangeText,
    _setTextInputRef,
    handleOnTextChange,
    _handleOnPressReset,
    handleOnPressCancel
  }) => {
    return (
      <View style={styles.root}>
        <View style={styles.searchInputWrapper}>
          <Icon name="search" style={styles.searchIcon} />
          <TextInput
            ref={_setTextInputRef}
            style={styles.searchInput}
            value={_text}
            onChangeText={handleOnTextChange}
            onSubmitEditing={Keyboard.dismiss}
          />
          <TouchableOpacity onPress={_handleOnPressReset}>
            <Icon name="cancel" style={styles.cancelIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleOnPressCancel}>
          <Text style={styles.cancelText}> Cancel </Text>
        </TouchableOpacity>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  root: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 2
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgb(245,245,245)",
    borderRadius: 2,
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4
  },

  searchInput: {
    flex: 1,
    padding: 4
  },
  searchIcon: {
    fontSize: ICON_SIZE
  },
  cancelIcon: {
    fontSize: ICON_SIZE,
    color: "rgb(192,192,192)"
  },
  cancelText: {
    fontSize: MD_FONT_SIZE,
    textAlign: "right",
    marginLeft: 4
  }
});

export default SearchBar;
