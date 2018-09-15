import { friendRequestConstants } from "../config/constants";
import { _array } from "../_helpers";

const {
  FRIEND_REQUEST_INDEX_PENDING,
  FRIEND_REQUEST_INDEX_REJECTED,
  FRIEND_REQUEST_INDEX_FULFILLED,

  // FRIEND_REQUEST_CREATE_PENDING,
  // FRIEND_REQUEST_CREATE_REJECTED,
  // FRIEND_REQUEST_CREATE_FULFILLED,

  FRIEND_REQUEST_CONFIRM_PENDING,
  FRIEND_REQUEST_CONFIRM_REJECTED,
  FRIEND_REQUEST_CONFIRM_FULFILLED,

  FRIEND_REQUEST_DECLINE_PENDING,
  FRIEND_REQUEST_DECLINE_REJECTED,
  FRIEND_REQUEST_DECLINE_FULFILLED
} = friendRequestConstants;

const initialState = {
  // data: null,
  incomingReqs: null,
  outgoingReqs: null,
  pendingIndex: false,
  fulfilledIndex: false,
  rejectedIndex: false,
  indexErrors: {},

  createdData: null,
  pendingCreate: false,
  fulfilledCreate: false,
  rejectedCreate: false,
  createErrors: {},

  confirmedReqId: null,
  pendingConfirm: false,
  fulfilledConfirm: false,
  rejectedConfirm: false,
  confirmErrors: {},

  declinedReqId: null,
  pendingDecline: false,
  fulfilledDecline: false,
  rejectedDecline: false,
  declineErrors: {}
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
      const {
        incoming_requests: incomingReqs,
        outgoing_requests: outgoingReqs
      } = action.payload;
      return {
        ...state,
        pendingIndex: false,
        fulfilledIndex: true,
        indexErrors: {},
        incomingReqs,
        outgoingReqs
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

    case FRIEND_REQUEST_CONFIRM_PENDING: {
      return { ...state, pendingConfirm: true };
    }

    case FRIEND_REQUEST_CONFIRM_REJECTED: {
      return {
        ...state,
        pendingConfirm: false,
        rejectedConfirm: true,
        confirmErrors: action.payload
      };
    }

    case FRIEND_REQUEST_CONFIRM_FULFILLED: {
      const confirmedReqId = action.payload;
      return {
        ...state,
        confirmedReqId,
        pendingConfirm: false,
        fulfilledConfirm: true,
        confirmErrors: {},
        incomingReqs: state.incomingReqs._removeObj(confirmedReqId, "id")
      };
    }

    case FRIEND_REQUEST_DECLINE_PENDING: {
      return { ...state, pendingDecline: true };
    }

    case FRIEND_REQUEST_DECLINE_REJECTED: {
      return {
        ...state,
        pendingDecline: false,
        rejectedDecline: true,
        declineErrors: action.payload
      };
    }

    case FRIEND_REQUEST_DECLINE_FULFILLED: {
      const declinedReqId = action.payload;
      return {
        ...state,
        pendingDecline: false,
        fulfilledDecline: true,
        declineErrors: {},
        data: state.incomingReqs._removeObj(declinedReqId, "id"),
        declinedReqId: declinedReqId
      };
    }

    default:
      return state;
  }
};
