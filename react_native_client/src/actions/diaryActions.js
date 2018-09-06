import { diaryConstants } from "../config/constants";
import { diaryService } from "../_requests";
import { AsyncStorage } from "react-native";

const {
  DIARY_INDEX_PENDING,
  DIARY_INDEX_REJECTED,
  DIARY_INDEX_FULFILLED,

  DIARY_CREATE_PENDING,
  DIARY_CREATE_REJECTED,
  DIARY_CREATE_FULFILLED,

  DIARY_DESTROY_PENDING,
  DIARY_DESTROY_REJECTED,
  DIARY_DESTROY_FULFILLED
} = diaryConstants;

export default {
  index: () => async dispatch => {
    dispatch({ type: DIARY_INDEX_PENDING });

    try {
      const diaries = await diaryService.index();
      dispatch({ type: DIARY_INDEX_FULFILLED, payload: diaries });
    } catch (error) {
      dispatch({ type: DIARY_INDEX_REJECTED, payload: error });
    }
  },
  create: diary => async dispatch => {
    dispatch({ type: DIARY_CREATE_PENDING });

    try {
      const newDiary = await diaryService.create(diary);
      dispatch({ type: DIARY_CREATE_FULFILLED, payload: newDiary });
    } catch (error) {
      dispatch({ type: DIARY_CREATE_REJECTED, payload: error });
    }
  },
  destroy: diaryId => async dispatch => {
    dispatch({ type: DIARY_DESTROY_PENDING });

    try {
      const destroyedDiary = await diaryService.destroy(diaryId);
      dispatch({ type: DIARY_DESTROY_FULFILLED, payload: destroyedDiary });
    } catch (error) {
      dispatch({ type: DIARY_DESTROY_REJECTED, payload: error });
    }
  }
};
