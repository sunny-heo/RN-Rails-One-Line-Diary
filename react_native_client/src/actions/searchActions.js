import { searchConstants } from "../config/constants";
import { searchService } from "../_requests";
import { AsyncStorage } from "react-native";

const {
  SEARCH_USER_PENDING,
  SEARCH_USER_REJECTED,
  SEARCH_USER_FULFILLED
} = searchConstants;

export default {
  user: () => async dispatch => {
    dispatch({ type: SEARCH_USER_PENDING });

    try {
      const searchResults = await searchService.user();
      dispatch({ type: SEARCH_USER_FULFILLED, payload: searchResults });
    } catch (error) {
      dispatch({ type: SEARCH_USER_REJECTED, payload: error });
    }
  }
};
