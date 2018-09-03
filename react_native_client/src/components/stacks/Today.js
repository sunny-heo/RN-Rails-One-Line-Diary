import { createStackNavigator } from "react-navigation";
import {
  TodayIndex,
  TodayDiary,
  PeopleIndex,
  DiariesIndex,
  SettingsIndex
} from "../presentations";

const Today = createStackNavigator(
  { TodayIndex, TodayDiary },
  {
    initialRouteName: "TodayIndex"
  }
);

export default Today;
