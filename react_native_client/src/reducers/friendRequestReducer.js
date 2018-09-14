import { friendRequestConstants } from "../config/constants";
import { _array } from "../_helpers";

const {
  FRIEND_REQUEST_INDEX_PENDING,
  FRIEND_REQUEST_INDEX_REJECTED,
  FRIEND_REQUEST_INDEX_FULFILLED,

  // FRIEND_REQUEST_CREATE_PENDING,
  // FRIEND_REQUEST_CREATE_REJECTED,
  // FRIEND_REQUEST_CREATE_FULFILLED,

  FRIEND_REQUEST_UPDATE_PENDING,
  FRIEND_REQUEST_UPDATE_REJECTED,
  FRIEND_REQUEST_UPDATE_FULFILLED

  // FRIEND_REQUEST_DESTROY_PENDING,
  // FRIEND_REQUEST_DESTROY_REJECTED,
  // FRIEND_REQUEST_DESTROY_FULFILLED
} = friendRequestConstants;

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
  createErrors: {},

  updatedData: null,
  pendingUpdate: false,
  fulfilledUpdate: false,
  rejectedUpdate: false,
  updateErrors: {},

  destroyedData: null,
  pendingDestroy: false,
  fulfilledDestroy: false,
  rejectedDestroy: false,
  destroyErrors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FRIEND_REQUEST_INDEX_PENDING: {
      return { ...state, pendingIndex: true };
    }

    case FRIEND_REQUEST_INDEX_REJECTED: {
      return {
        ...state,
        pendingIndex: false,
        rejectedIndex: true,
        indexErrors: action.payload
      };
    }

    case FRIEND_REQUEST_INDEX_FULFILLED: {
      return {
        ...state,
        pendingIndex: false,
        fulfilledIndex: true,
        indexErrors: {},
        data: action.payload
      };
    }

    // case FRIEND_REQUEST_CREATE_PENDING: {
    //   return { ...state, pendingCreate: true };
    // }

    // case FRIEND_REQUEST_CREATE_REJECTED: {
    //   return {
    //     ...state,
    //     pendingCreate: false,
    //     rejectedCreate: true,
    //     createErrors: action.payload
    //   };
    // }

    // case FRIEND_REQUEST_CREATE_FULFILLED: {
    //   const newDiary = action.payload;
    //   return {
    //     ...state,
    //     pendingCreate: false,
    //     fulfilledCreate: true,
    //     createErrors: {},
    //     data: [newDiary].concat(state.data),
    //     createdData: newDiary
    //   };
    // }

    case FRIEND_REQUEST_UPDATE_PENDING: {
      return { ...state, pendingUpdate: true };
    }

    case FRIEND_REQUEST_UPDATE_REJECTED: {
      return {
        ...state,
        pendingUpdate: false,
        rejectedUpdate: true,
        updateErrors: action.payload
      };
    }

    case FRIEND_REQUEST_UPDATE_FULFILLED: {
      const updatedDiary = action.payload;

      return {
        ...state,
        pendingUpdate: false,
        fulfilledUpdate: true,
        updateErrors: {},
        data: state.data._removeObj(updatedDiary, "id"),
        updatedData: updatedDiary
      };
    }

    // case FRIEND_REQUEST_DESTROY_PENDING: {
    //   return { ...state, pendingDestroy: true };
    // }

    // case FRIEND_REQUEST_DESTROY_REJECTED: {
    //   return {
    //     ...state,
    //     pendingDestroy: false,
    //     rejectedDestroy: true,
    //     destroyErrors: action.payload
    //   };
    // }

    // case FRIEND_REQUEST_DESTROY_FULFILLED: {
    //   const destroyedDiary = action.payload;
    //   return {
    //     ...state,
    //     pendingDestroy: false,
    //     fulfilledDESTROY: true,
    //     destroyErrors: {},
    //     data: state.data.filter(diary => diary.id !== destroyedDiary.id),
    //     destroyedData: destroyedDiary
    //   };
    // }

    default:
      return state;
  }
};
