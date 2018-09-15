import { friendRequestConstants } from "../config/constants";
import { friendRequestService } from "../_requests";

const {
  FRIEND_REQUEST_INDEX_PENDING,
  FRIEND_REQUEST_INDEX_REJECTED,
  FRIEND_REQUEST_INDEX_FULFILLED,

  FRIEND_REQUEST_CREATE_PENDING,
  FRIEND_REQUEST_CREATE_REJECTED,
  FRIEND_REQUEST_CREATE_FULFILLED,

  FRIEND_REQUEST_CONFIRM_PENDING,
  FRIEND_REQUEST_CONFIRM_REJECTED,
  FRIEND_REQUEST_CONFIRM_FULFILLED,

  FRIEND_REQUEST_DECLINE_PENDING,
  FRIEND_REQUEST_DECLINE_REJECTED,
  FRIEND_REQUEST_DECLINE_FULFILLED
} = friendRequestConstants;

export default {
  index: () => async dispatch => {
    dispatch({ type: FRIEND_REQUEST_INDEX_PENDING });

    try {
      const diaries = await friendRequestService.index();
      dispatch({ type: FRIEND_REQUEST_INDEX_FULFILLED, payload: diaries });
    } catch (error) {
      dispatch({ type: FRIEND_REQUEST_INDEX_REJECTED, payload: error });
    }
  },

  // create: diary => async dispatch => {
  //   dispatch({ type: FRIEND_REQUEST_CREATE_PENDING });

  //   try {
  //     const newDiary = await friendRequestService.create(diary);
  //     dispatch({ type: FRIEND_REQUEST_CREATE_FULFILLED, payload: newDiary });
  //   } catch (error) {
  //     dispatch({ type: FRIEND_REQUEST_CREATE_REJECTED, payload: error });
  //   }
  // },

  update: reqId => async dispatch => {
    dispatch({ type: FRIEND_REQUEST_CONFIRM_PENDING });

    try {
      const confirmedReqId = await friendRequestService.update(reqId);
      dispatch({
        type: FRIEND_REQUEST_CONFIRM_FULFILLED,
        payload: confirmedReqId
      });
    } catch (error) {
      dispatch({ type: FRIEND_REQUEST_CONFIRM_REJECTED, payload: error });
    }
  },

  destroy: reqId => async dispatch => {
    dispatch({ type: FRIEND_REQUEST_DECLINE_PENDING });

    try {
      const declinedReqId = await friendRequestService.destroy(reqId);
      dispatch({
        type: FRIEND_REQUEST_DECLINE_FULFILLED,
        payload: declinedReqId
      });
    } catch (error) {
      dispatch({ type: FRIEND_REQUEST_DECLINE_REJECTED, payload: error });
    }
  }
};
