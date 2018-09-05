import React, { Component } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { differenceInDays, format } from "date-fns";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Picker
} from "react-native";
import { Button, COLOR } from "react-native-material-ui";
import { withNavigation } from "react-navigation";
import { TextField } from "react-native-material-textfield";
import DateTimePicker from "react-native-modal-datetime-picker";

import MultiSelect from "react-native-multiple-select";
import RF from "react-native-responsive-fontsize";
import {diaryActions} from "../../actions"

const mapStateToProps = (state, nextOwnProps) => state;


class DiaryNew extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      isDateTimePickerVisible: false,
      // selectedDate: format(new Date(), "MMM Do, YYYY"),
      selectedDate: "Select disclose date",
      selectedItems: [],
      autoFocusInput: false
    };

    this.nameRef = this._updateRef.bind(this, "name");
    this.friendsRef = this._updateRef.bind(this, "friends");

    this.items = [
      {
        id: "92iijs7yta",
        name: "Ondo"
      },
      {
        id: "a0s0a8ssbsd",
        name: "Ogun"
      },
      {
        id: "16hbajsabsd",
        name: "Calabar"
      },
      {
        id: "nahs75a5sg",
        name: "Lagos"
      },
      {
        id: "667atsas",
        name: "Maiduguri"
      },
      {
        id: "hsyasajs",
        name: "Anambra"
      },
      {
        id: "djsjudksjd",
        name: "Benue"
      },
      {
        id: "sdhyaysdj",
        name: "Kaduna"
      },
      {
        id: "suudydjsjd",
        name: "Abuja"
      }
    ];
  }

  componentDidMount() {
    this.name.focus();
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    // this.setState({ selectedDate: format(date, "MMM Do, YYYY") });
    this.setState({ selectedDate: date });
    this._hideDateTimePicker();
  };

  _onChangeText = text => {
    ["name"]
      .map(name => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          this.setState({ [name]: text });
        }
      });
  };

  _onSubmitDaiaryName = () => {};

  _updateRef(name, ref) {
    this[name] = ref;
  }

  _onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  _onSubmit = () => {
    console.log(this.props);
    const {name, discloseDate: disclose_date} = this.state;
    await this.props.dispatch(diaryActions.create({ name, disclose_date }));
  };

  render() {
    const { name } = this.state;
    return (
      <View style={styles.root}>
        <Text style={styles.titleText}>Create New Diary</Text>
        <View style={{ marginBottom: 16 }}>
          <TextField
            ref={this.nameRef}
            // ref={component => {
            //   this.nameRef = component;
            // }}
            label="Name"
            value={name}
            _onChangeText={this._onChangeText}
            onSubmitEditing={this._onSubmitDaiaryName}
            autoCapitalize="none"
            autoCorrect={false}
            // error={errors.email}
          />
        </View>
        {/* <View
          style={{ borderWidth: StyleSheet.hairlineWidth, marginBottom: 16 }}
        > */}
        <MultiSelect
          items={this.items}
          uniqueKey="id"
          // ref={component => {
          //   console.log(component);
          //   this.multiSelect = component;
          // }}
          ref={this.friendsRef}
          _onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          selectText="Select friends to share"
          searchInputPlaceholderText="Search Friends to share this diary"
          onChangeInput={text => console.log(text)}
          tagRemoveIconColor={COLOR.blue900}
          tagBorderColor={COLOR.blue500}
          tagTextColor={COLOR.blue500}
          selectedItemTextColor={COLOR.blue500}
          selectedItemIconColor={COLOR.blue500}
          itemTextColor="#424242"
          displayKey="name"
          searchInputStyle={{ color: COLOR.blue500 }}
          submitButtonColor={COLOR.blue500}
          submitButtonText="Done"
          style={{ backgroundColor: "red" }}
        />
        {/* </View> */}
        <View
          style={{
            paddingBottom: 8,
            marginBottom: 16,
            borderBottomWidth: StyleSheet.hairlineWidth
          }}
        >
          <TouchableOpacity onPress={this._showDateTimePicker}>
            <View style={styles.button}>
              <Text>
                {/* {format(this.state.selectedDate, "MMM Do, YYYY")} */}
                {this.state.selectedDate instanceof Date
                  ? `Disclose on ${format(
                      this.state.selectedDate,
                      "MMM Do, YYYY"
                    )}`
                  : "Select disclose date"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Button primary raised text="Create" onPress={this._onSubmit} />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode={"date"}
        />
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
  titleText: {
    textAlign: "center",
    fontSize: RF(4)
  },
  textContainer: {
    marginLeft: 16,
    marginRight: 16
  }
});

export default connect(mapStateToProps)(DiaryNew);
