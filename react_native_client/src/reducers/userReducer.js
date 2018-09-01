import { userConstants } from "../config/constants";

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

const initialState = {
  data: null,
  pendingSignIn: false,
  signedIn: false,
  pendingSignUp: false,
  signedUp: false,
  pendingSignOut: false,
  signedOut: false,
  authError: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_USER_PENDING: {
      return { ...state, pendingSignIn: true };
    }

    case SIGNIN_USER_REJECTED: {
      return { ...state, pendingSignIn: false, authError: action.payload };
    }

    case SIGNIN_USER_FULFILLED: {
      return {
        ...state,
        pendingSignIn: false,
        signedIn: true,
        authError: {},
        data: action.payload
      };
    }

    case SIGNUP_USER_PENDING: {
      return { ...state, pendingSignUp: true };
    }

    case SIGNUP_USER_REJECTED: {
      return { ...state, pendingSignUp: false, authError: action.payload };
    }

    case SIGNUP_USER_FULFILLED: {
      return {
        ...state,
        pendingSignUp: false,
        signedUp: true,
        signedIn: true,
        data: action.payload
      };
    }

    case SIGNOUT_USER_PENDING: {
      return { ...state, pendingSignOut: true };
    }

    case SIGNOUT_USER_REJECTED: {
      return { ...state, pendingSignOut: false, authError: action.payload };
    }

    case SIGNOUT_USER_FULFILLED: {
      return {
        ...state,
        pendingSignOut: false,
        signedIn: false,
        signedUp: false,
        signedOut: true,
        data: action.payload
      };
    }

    default:
      return state;
  }
};
