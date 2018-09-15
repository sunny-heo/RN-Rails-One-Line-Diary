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
import { Button, COLOR } from "react-native-material-ui";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MIcon from "react-native-vector-icons/MaterialIcons";

import MultiSelect from "react-native-multiple-select";
import RF from "react-native-responsive-fontsize";
import { diaryActions } from "../../../actions";

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

  _onSubmit = async () => {
    try {
      await this._validateInputs();
      const { name, discloseDate, errors } = this.state;

      if (!Object.keys(errors).length) {
        const disclose_date = discloseDate.toString();
        await this.props.dispatch(diaryActions.create({ name, disclose_date }));
        const { navigation, diary } = this.props;
        if (diary.fulfilledCreate) navigation.navigate("Home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { name, discloseDate, errors } = this.state;
    return (
      <View style={styles.root}>
        <View style={styles.searchBar}>
          <MCIcon name="account-search" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
          <MIcon name="cancel" style={styles.cancelIcon} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgb(255, 255, 255)",
    padding: 16
  },
  searchBar: {
    flex: 0.05,
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 2,
    shadowOpacity: 0.75,
    shadowRadius: 1,
    // shadowColor: "red",
    shadowOffset: { height: 0, width: 0 }
  },
  searchInput: {
    flex: 1,
    borderColor: "blue",
    padding: 4,
    borderWidth: 1
  },
  searchIcon: {
    fontSize: RF(4)
  },
  cancelIcon: {
    fontSize: RF(3),
    color: "gray"
  },
  titleText: {
    textAlign: "center",
    fontSize: RF(4)
  },
  textContainer: {
    marginLeft: 16,
    marginRight: 16
  },
  discloseDateContainer: {
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  discloseDateErrorContainer: {
    marginTop: 4,
    marginBottom: 32
  },
  errorText: {
    color: COLOR.red700,
    fontSize: RF(1.8)
  }
});

export default connect(mapStateToProps)(FriendNew);
