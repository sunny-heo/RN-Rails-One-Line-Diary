import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Animated,
  Text,
  ActivityIndicator,
  Keyboard,
  StyleSheet
} from "react-native";
import { userActions } from "../../actions";
import { TextField } from "react-native-material-textfield";
import { Button } from "react-native-material-ui";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const IMAGE_SCALE_LARGE = 1.15;
const IMAGE_TRNSLATE_X = 20;
const mapStateToProps = (state, nextOwnProps) => state;
const mapDispatchToProps = dispatch => {
  return {
    onSignIn: async (email, password) => {
      await dispatch(userActions.signInUser({ email, password }));
    }
  };
};

class SignIn extends Component {
  static navigationOptions = {
    title: "Authentication"
  };

  constructor() {
    super();
    this.state = {
      // email: "",
      // password: "",
      email: "sunny@gmail.com",
      password: "superSecret1@",
      secureTextEntry: true
    };
    this.imageScale = new Animated.Value(1);
    this.keyboardHeight = new Animated.Value(0);
    this.imageTranslateX = new Animated.Value(0);

    this.emailRef = this._updateRef.bind(this, "email");
    this.passwordRef = this._updateRef.bind(this, "password");
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      "keyboardWillShow",
      this._keyboardWillShow
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      "keyboardWillHide",
      this._keyboardWillHide
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  _keyboardWillShow = event => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: -event.endCoordinates.height
      }),
      Animated.timing(this.imageScale, {
        duration: event.duration,
        toValue: IMAGE_SCALE_LARGE
      }),
      Animated.timing(this.imageTranslateX, {
        duration: event.duration,
        toValue: IMAGE_TRNSLATE_X
      })
    ]).start();
  };

  _keyboardWillHide = event => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 0
      }),
      Animated.timing(this.imageScale, {
        duration: event.duration,
        toValue: 1
      }),
      Animated.timing(this.imageTranslateX, {
        duration: event.duration,
        toValue: 0
      })
    ]).start();
  };

  _onSubmitEmail = () => {
    this.password.focus();
  };

  _onChangeText = text => {
    ["email", "password"]
      .map(name => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          this.setState({ [name]: text });
        }
      });
  };
  _validateInputs = () => {
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
  };

  _onSubmit = async () => {
    try {
      await this._validateInputs();
      const { email, password, errors } = this.state;

      if (!Object.keys(errors).length) {
        await this.props.onSignIn(email, password);

        const { user, navigation } = this.props;
        if (user.signedIn) navigation.navigate("AuthLoading");
      }
    } catch (error) {
      console.log(error);
    }
  };

  _onAccessoryPress = () => {
    this.setState(({ secureTextEntry }) => ({
      secureTextEntry: !secureTextEntry
    }));
  };

  _renderPasswordAccessory = () => {
    let { secureTextEntry } = this.state;

    let name = secureTextEntry ? "visibility" : "visibility-off";

    return (
      <MaterialIcon
        size={24}
        name={name}
        color={TextField.defaultProps.baseColor}
        onPress={this._onAccessoryPress}
        suppressHighlighting
      />
    );
  };

  _updateRef(name, ref) {
    this[name] = ref;
  }

  render() {
    const { email, password, secureTextEntry, errors = {} } = this.state;
    return (
      <Animated.View style={[styles.root, { marginTop: this.keyboardHeight }]}>
        <Animated.Image
          source={require("../../img/auth_background.jpg")}
          style={[
            styles.backgroundImage,
            {
              transform: [
                { scale: this.imageScale },
                { translateX: this.imageTranslateX }
              ]
            }
          ]}
        />
        <View style={styles.container}>
          <Text style={styles.title}>Sign In</Text>
          <TextField
            ref={this.emailRef}
            label="Email"
            value={email}
            keyboardType="email-address"
            _onChangeText={this._onChangeText}
            onSubmitEditing={this._onSubmitEmail}
            autoCapitalize="none"
            autoCorrect={false}
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
            renderAccessory={this._renderPasswordAccessory}
            onChangeText={this._onChangeText}
            clearTextOnFocus={true}
            autoCapitalize="none"
            error={errors.password}
          />

          {this.props.user.authError ? (
            <Text style={styles.authFailure}>
              {this.props.user.authError.message}
            </Text>
          ) : null}
          {this.props.user.pendingSignIn ? (
            <ActivityIndicator size="small" />
          ) : (
            <Button
              primary
              raised
              text="Sign In"
              style={styles.submitBtn}
              onPress={this._onSubmit}
            />
          )}
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  foo: {
    flex: 1
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  container: {
    width: "90%",
    margin: 16,
    padding: 16,
    backgroundColor: "rgba(255,255,255, 0.8)",
    borderRadius: 4
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
