import { friendRequestConstants } from "../config/constants";
import { _array } from "../_helpers";

const {
  SEARCH_USER_PENDING,
  SEARCH_USER_REJECTED,
  SEARCH_USER_FULFILLED
} = friendRequestConstants;

const initialState = {
  userSearchReuslt: null,
  pendingSearchUser: false,
  fulfilledSearchUser: false,
  rejectedSearchUser: false,
  searchUserErrors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_USER_INDEX_PENDING: {
      return { ...state, pendingSearchUser: true };
    }

    case SEARCH_USER_INDEX_REJECTED: {
      return {
        ...state,
        pendingSearchUser: false,
        rejectedSearchUser: true,
        searchUserErrors: action.payload
      };
    }

    case SEARCH_USER_INDEX_FULFILLED: {
      return {
        ...state,
        pendingSearchUser: false,
        fulfilledSearchUser: true,
        userSearchReuslt: action.payload,
        searchUserErrors: {}
      };
    }

    default:
      return state;
  }
};
