import { diaryConstants } from "../config/constants";

const {
  DIARY_INDEX_PENDING,
  DIARY_INDEX_REJECTED,
  DIARY_INDEX_FULFILLED,

  DIARY_CREATE_PENDING,
  DIARY_CREATE_REJECTED,
  DIARY_CREATE_FULFILLED
} = diaryConstants;

const initialState = {
  data: null,
  pendingIndex: false,
  fulfilledIndex: false,
  rejectedIndex: false,
  indexErrors: {},

  createdData: null,
  pendingCreate: false,
  fulfilledCreate: false,
  rejectedCreate: false,
  createErrors: {}
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

    case DIARY_CREATE_PENDING: {
      return { ...state, pendingCreate: true };
    }

    case DIARY_CREATE_REJECTED: {
      return {
        ...state,
        pendingCreate: false,
        rejectedCreate: true,
        createErrors: action.payload
      };
    }

    case DIARY_CREATE_FULFILLED: {
      const newDiary = action.payload;
      return {
        ...state,
        pendingCreate: false,
        fulfilledCreate: true,
        createErrors: {},
        data: [newDiary].concat(state.data),
        createdData: newDiary
      };
    }

    default:
      return state;
  }
};

