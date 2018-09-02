import { createStackNavigator } from "react-navigation";
import { TodayIndex, TodayDiary } from "../presentations";

const Today = createStackNavigator(
  { TodayIndex, TodayDiary },
  {
    initialRouteName: "TodayIndex"
  }
);

export default Today;
