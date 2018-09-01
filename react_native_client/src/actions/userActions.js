import { userConstants } from "../config/constants";
import { userService } from "../_requests";
import { AsyncStorage } from "react-native";

const {
  SIGNIN_USER_PENDING,
  SIGNIN_USER_REJECTED,
  SIGNIN_USER_FULFILLED,

  SIGNUP_USER_PENDING,
  SIGNUP_USER_REJECTED,
  SIGNUP_USER_FULFILLED,

  SIGNOUT_USER_PENDING,
  SIGNOUT_USER_REJECTED,
  SIGNOUT_USER_FULFILLED
} = userConstants;

export default {
  signUpUser: userInput => async dispatch => {
    dispatch({ type: SIGNUP_USER_PENDING });

    try {
      const user = await userService.signUp(userInput);
      dispatch({ type: SIGNUP_USER_FULFILLED, payload: user });
    } catch (error) {
      dispatch({ type: SIGNUP_USER_REJECTED, payload: error });
    }
  },
  signInUser: userInput => async dispatch => {
    dispatch({ type: SIGNIN_USER_PENDING });
    try {
      const user = await userService.signIn(userInput);
      // user.error
      //   ? dispatch({ type: SIGNIN_USER_REJECTED, payload: user.error })
      //   : dispatch({ type: SIGNIN_USER_FULFILLED, payload: user });

      if (user.error) {
        dispatch({ type: SIGNIN_USER_REJECTED, payload: user.error });
      } else {
        dispatch({ type: SIGNIN_USER_FULFILLED, payload: user });
        await AsyncStorage.setItem("userData", JSON.stringify(user));
      }
    } catch (error) {
      dispatch({ type: SIGNIN_USER_REJECTED, payload: error });
    }
  },
  signOutUser: () => async dispatch => {
    dispatch({ type: SIGNOUT_USER_PENDING });

    try {
      await userService.signOut();
      dispatch({ type: SIGNOUT_USER_FULFILLED, payload: {} });
      await AsyncStorage.removeItem("userData");
    } catch (error) {
      dispatch({ type: SIGNOUT_USER_REJECTED, payload: error });
    }
  }
};
