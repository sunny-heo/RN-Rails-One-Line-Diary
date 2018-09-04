import { diaryActions } from "../config/constants";

const {
  DIARY_INDEX_PENDING,
  DIARY_INDEX_REJECTED,
  DIARY_INDEX_FULFILLED
} = diaryActions;

const initialState = {
  data: null,
  pendingIndex: false,
  fulfilledIndex: false,
  rejectedIndex: false,
  indexErrors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DIARY_INDEX_PENDING: {
      return { ...state, pendingIndex: true };
    }

    case DIARY_INDEX_REJECTED: {
      return {
        ...state,
        pendingIndex: false,
        rejectedIndex: true,
        indexErrors: action.payload
      };
    }

    case DIARY_INDEX_FULFILLED: {
      return {
        ...state,
        pendingIndex: false,
        fulfilledIndex: true,
        indexErrors: {},
        data: action.payload
      };
    }

    default:
      return state;
  }
};
