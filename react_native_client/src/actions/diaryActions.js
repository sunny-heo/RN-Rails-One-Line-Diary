import { diaryConstants } from "../config/constants";
import { diaryService } from "../_requests";
import { AsyncStorage } from "react-native";

const {
  DIARY_INDEX_PENDING,
  DIARY_INDEX_REJECTED,
  DIARY_INDEX_FULFILLED
} = diaryConstants;

export default {
  index: () => async dispatch => {
    dispatch({ type: DIARY_INDEX_PENDING });

    try {
      const diaries = await diaryService.diaryIndex();
      dispatch({ type: DIARY_INDEX_FULFILLED, payload: diaries });
    } catch (error) {
      dispatch({ type: DIARY_INDEX_REJECTED, payload: error });
    }
  }
};
