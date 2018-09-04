import { combineReducers } from "redux";
import user from "./userReducer";
// import diary from "./diaryReducer";

const rootReducer = combineReducers({
  user
  // diary
});

export default rootReducer;
