import { diaryConstants } from "../config/constants";
import { _array } from "../_helpers";

const {
  DIARY_INDEX_PENDING,
  DIARY_INDEX_REJECTED,
  DIARY_INDEX_FULFILLED,

  DIARY_CREATE_PENDING,
  DIARY_CREATE_REJECTED,
  DIARY_CREATE_FULFILLED,

  DIARY_UPDATE_PENDING,
  DIARY_UPDATE_REJECTED,
  DIARY_UPDATE_FULFILLED,

  DIARY_DESTROY_PENDING,
  DIARY_DESTROY_REJECTED,
  DIARY_DESTROY_FULFILLED
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

    case DIARY_UPDATE_PENDING: {
      return { ...state, pendingUpdate: true };
    }

    case DIARY_UPDATE_REJECTED: {
      return {
        ...state,
        pendingUpdate: false,
        rejectedUpdate: true,
        updateErrors: action.payload
      };
    }

    case DIARY_UPDATE_FULFILLED: {
      const updatedDiary = action.payload;

      return {
        ...state,
        pendingUpdate: false,
        fulfilledUpdate: true,
        updateErrors: {},
        data: state.data._replaceObj(updatedDiary, "id"),
        updatedData: updatedDiary
      };
    }

    case DIARY_DESTROY_PENDING: {
      return { ...state, pendingDestroy: true };
    }

    case DIARY_DESTROY_REJECTED: {
      return {
        ...state,
        pendingDestroy: false,
        rejectedDestroy: true,
        destroyErrors: action.payload
      };
    }

    case DIARY_DESTROY_FULFILLED: {
      const destroyedDiary = action.payload;
      return {
        ...state,
        pendingDestroy: false,
        fulfilledDESTROY: true,
        destroyErrors: {},
        data: state.data.filter(diary => diary.id !== destroyedDiary.id),
        destroyedData: destroyedDiary
      };
    }

    default:
      return state;
  }
};
