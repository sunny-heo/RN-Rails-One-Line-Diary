import { friendRequestConstants } from "../config/constants";
import { friendRequestService } from "../_requests";

const {
  FRIEND_REQUEST_INDEX_PENDING,
  FRIEND_REQUEST_INDEX_REJECTED,
  FRIEND_REQUEST_INDEX_FULFILLED,

  FRIEND_REQUEST_CREATE_PENDING,
  FRIEND_REQUEST_CREATE_REJECTED,
  FRIEND_REQUEST_CREATE_FULFILLED,

  FRIEND_REQUEST_UPDATE_PENDING,
  FRIEND_REQUEST_UPDATE_REJECTED,
  FRIEND_REQUEST_UPDATE_FULFILLED,

  FRIEND_REQUEST_DESTROY_PENDING,
  FRIEND_REQUEST_DESTROY_REJECTED,
  FRIEND_REQUEST_DESTROY_FULFILLED
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

  update: diary => async dispatch => {
    dispatch({ type: FRIEND_REQUEST_UPDATE_PENDING });

    try {
      const updatedDiary = await friendRequestService.update(diary);
      dispatch({
        type: FRIEND_REQUEST_UPDATE_FULFILLED,
        payload: updatedDiary
      });
    } catch (error) {
      dispatch({ type: FRIEND_REQUEST_UPDATE_REJECTED, payload: error });
    }
  }

  // destroy: diaryId => async dispatch => {
  //   dispatch({ type: FRIEND_REQUEST_DESTROY_PENDING });

  //   try {
  //     const destroyedDiary = await friendRequestService.destroy(diaryId);
  //     dispatch({
  //       type: FRIEND_REQUEST_DESTROY_FULFILLED,
  //       payload: destroyedDiary
  //     });
  //   } catch (error) {
  //     dispatch({ type: FRIEND_REQUEST_DESTROY_REJECTED, payload: error });
  //   }
  // }
};
