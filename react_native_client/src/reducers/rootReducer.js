import { combineReducers } from "redux";
import user from "./userReducer";
import diary from "./diaryReducer";
import friendRequest from "./friendRequestReducer";
import search from "./searchReducer";

const rootReducer = combineReducers({
  user,
  diary,
  friendRequest,
  search
});

export default rootReducer;
