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
import { diaryActions } from "../../actions";

const mapStateToProps = (state, nextOwnProps) => state;

class DiaryNew extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      isDateTimePickerVisible: false,
      discloseDate: null,
      selectedItems: [],
      errors: {}
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

  _handleDatePicked = discloseDate => {
    this.setState({ discloseDate });
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

  _onSubmitDaiaryName = () => {
    this._showDateTimePicker();
  };

  _updateRef(name, ref) {
    this[name] = ref;
  }

  _onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  _validateInputs = () => {
    let errors = {};
    const { name, discloseDate } = this.state;
    const inputObj = { name, discloseDate };

    Object.keys(inputObj).forEach(input => {
      const value = this.state[input];
      if (!value) {
        errors[input] = "Should not be empty";
      } else if (input === "discloseDate" && discloseDate <= new Date()) {
        errors[input] = `Disclose date should be later than ${format(
          new Date(),
          "MMM Do, YYYY"
        )}`;
      }
    });

    this.setState({ errors });
  };

  _onSubmit = async () => {
    try {
      await this._validateInputs();
      const { name, discloseDate, errors } = this.state;
      const disclose_date = discloseDate.toString();

      if (!Object.keys(errors).length) {
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
        <Text style={styles.titleText}>Create New Diary</Text>
        <View style={{ marginBottom: 16 }}>
          <TextField
            ref={this.nameRef}
            label="Name"
            value={name}
            onChangeText={this._onChangeText}
            onSubmitEditing={this._onSubmitDaiaryName}
            autoCapitalize="none"
            autoCorrect={false}
            error={errors.name}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <MultiSelect
            items={this.items}
            uniqueKey="id"
            ref={this.friendsRef}
            onSelectedItemsChange={this._onSelectedItemsChange}
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
        </View>
        <View
          style={{
            paddingBottom: 8,
            borderBottomWidth: StyleSheet.hairlineWidth
          }}
        >
          <TouchableOpacity onPress={this._showDateTimePicker}>
            <View style={styles.button}>
              <Text>
                {discloseDate
                  ? `Disclose on ${format(discloseDate, "MMM Do, YYYY")}`
                  : "Select disclose date"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 4,
            marginBottom: 32
          }}
        >
          {errors.discloseDate ? (
            <Text style={{ color: COLOR.red700, fontSize: RF(1.8) }}>
              {errors.discloseDate}
            </Text>
          ) : null}
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
