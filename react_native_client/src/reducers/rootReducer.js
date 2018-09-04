import { combineReducers } from "redux";
import user from "./userReducer";
import diaryReducer from "./diaryReducer";

const rootReducer = combineReducers({
  user,
  diary
});

export default rootReducer;
