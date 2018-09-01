import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from "react-native";
import { userActions } from "../../actions";
import { TextField } from "react-native-material-textfield";
import { Button, Card } from "react-native-material-ui";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
const mapStateToProps = (state, nextOwnProps) => state;

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      // email: "",
      // password: "",
      email: "sunny@gmail.com",
      password: "superSecret1@",
      secureTextEntry: true
    };
    this.emailRef = this.updateRef.bind(this, "email");
    this.passwordRef = this.updateRef.bind(this, "password");

    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onSubmitSignIn = this.onSubmitSignIn.bind(this);
    this.onAccessoryPress = this.onAccessoryPress.bind(this);
    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount");
    console.log(this.props.user.signedIn);
    if (this.props.user.signedIn) {
      this.props.navigation.navigate("Home");
    }
  }
  componentDidUpdate(prevProps) {
    const { user, navigation } = this.props;

    if (!prevProps.user.signedIn && user.signedIn) {
      navigation.navigate("Home");
    }
  }
  onSubmitEmail() {
    this.password.focus();
  }

  onChangeText(text) {
    ["email", "password"]
      .map(name => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          this.setState({ [name]: text });
        }
      });
  }

  onSubmitSignIn() {
    let errors = {};

    ["email", "password"].forEach(name => {
      let value = this[name].value();

      if (!value) {
        errors[name] = "Should not be empty";
      } else {
        if ("password" === name && value.length < 6) {
          errors[name] = "Too short";
        }
      }
    });

    this.setState({ errors });
    if (!Object.keys(errors).length) {
      const { signInUser } = userActions;
      const { email, password } = this.state;
      this.props.dispatch(signInUser({ email, password }));
    }
  }

  onSubmit() {
    let errors = {};
  }

  onAccessoryPress() {
    this.setState(({ secureTextEntry }) => ({
      secureTextEntry: !secureTextEntry
    }));
  }

  renderPasswordAccessory() {
    let { secureTextEntry } = this.state;

    let name = secureTextEntry ? "visibility" : "visibility-off";

    return (
      <MaterialIcon
        size={24}
        name={name}
        color={TextField.defaultProps.baseColor}
        onPress={this.onAccessoryPress}
        suppressHighlighting
      />
    );
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  render() {
    const { email, password, secureTextEntry, errors = {} } = this.state;
    return this.props.user.pendingSignIn ? (
      <ActivityIndicator size="large" />
    ) : (
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>

        <TextField
          ref={this.emailRef}
          label="Email"
          value={email}
          keyboardType="email-address"
          onChangeText={email => this.setState({ email })}
          onSubmitEditing={this.onSubmitEmail}
          autoCapitalize="none"
          error={errors.email}
        />
        <TextField
          ref={this.passwordRef}
          label="Password"
          value={password}
          secureTextEntry={secureTextEntry}
          maxLength={30}
          characterRestriction={20}
          returnKeyType="done"
          renderAccessory={this.renderPasswordAccessory}
          onChangeText={this.onChangeText}
          clearTextOnFocus={true}
          autoCapitalize="none"
          error={errors.password}
        />

        {this.props.user.authError ? (
          <Text style={styles.authFailure}>
            {this.props.user.authError.message}
          </Text>
        ) : null}
        <Button
          primary
          text="Sign In"
          style={styles.submitBtn}
          onPress={this.onSubmitSignIn}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20
  },
  title: {
    fontSize: 30,
    textAlign: "center"
  },
  authFailure: {
    textAlign: "center",
    color: "red"
  },
  submitBtn: {
    borderRadius: 2,
    color: "blue",
    backgroundColor: "rgb(133, 133, 133)"
  }
});

export default connect(mapStateToProps)(SignIn);
