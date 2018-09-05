import { diaryConstants } from "../config/constants";
import { diaryService } from "../_requests";
import { AsyncStorage } from "react-native";

const {
  DIARY_INDEX_PENDING,
  DIARY_INDEX_REJECTED,
  DIARY_INDEX_FULFILLED,

  DIARY_CREATE_PENDING,
  DIARY_CREATE_REJECTED,
  DIARY_CREATE_FULFILLED
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
  }
};
