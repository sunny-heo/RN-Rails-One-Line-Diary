import React, { Component } from "react";
import { compose, withState, lifecycle } from "recompose";
import {
  View,
  Text,
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
  lifecycle({
    componentDidUpdate() {
      this.props._textInputRef.focus();
    }
  })
);
const SearchBar = enhance(
  ({ _text, _setText, _textInputRef, _setTextInputRef }) => {
    return (
      <View style={styles.root}>
        <View style={styles.searchInputWrapper}>
          <Icon name="search" style={styles.searchIcon} />
          <TextInput
            ref={_setTextInputRef}
            style={styles.searchInput}
            value={_text}
            onChangeText={text => {
              _setText(text);
            }}
          />
          <TouchableOpacity>
            <Icon name="cancel" style={styles.cancelIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            _textInputRef.focus();
          }}
        >
          <Text style={styles.cancelText}> Cancel </Text>
        </TouchableOpacity>
      </View>
    );
  }
);

// class SearchBar extends Component {
//   render() {
//     return (
//       <View style={styles.root}>
//         <View style={styles.searchInputWrapper}>
//           <Icon name="search" style={styles.searchIcon} />
//           <TextInput
//             ref={component => (this._textInput = component)}
//             style={styles.searchInput}
//             // onChangeText={text => this.setState({ text })}
//             // value={this.state.text}
//             onChangeText={text => {
//               console.log(this._textInput);
//             }}
//           />
//           <TouchableOpacity>
//             <Icon name="cancel" style={styles.cancelIcon} />
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity>
//           <Text style={styles.cancelText}> Cancel </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

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
