import React, { Component } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { differenceInDays, format } from "date-fns";

import {
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import { SearchBar } from "../../customSearchBar";

const mapStateToProps = (state, nextOwnProps) => state;

class FriendNew extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      isDateTimePickerVisible: false,
      discloseDate: null,
      selectedItems: [],
      errors: {}
    };
  }

  render() {
    return (
      <View style={styles.root}>
        <SearchBar />
        {/* <View style={styles.rootSearchBar}>
          <View style={styles.childSearchBar}>
            <Icon name="search" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
            />
            <TouchableOpacity>
              <Icon name="cancel" style={styles.cancelIcon} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text style={styles.cancelText}> Cancel </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgb(255, 255, 255)",
    padding: 16
  }
});

export default connect(mapStateToProps)(FriendNew);
