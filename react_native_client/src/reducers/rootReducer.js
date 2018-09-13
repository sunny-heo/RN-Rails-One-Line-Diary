import { combineReducers } from "redux";
import user from "./userReducer";
import diary from "./diaryReducer";
import friendRequest from "./friendRequestReducer";

const rootReducer = combineReducers({
  user,
  diary,
  friendRequest
});

export default rootReducer;
