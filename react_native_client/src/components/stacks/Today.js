import { createStackNavigator } from "react-navigation";
import {
  TodayIndex,
  TodayDiary,
  DiaryNew,
  DiaryUpdate
} from "../presentations";

const Today = createStackNavigator(
  { TodayIndex, TodayDiary, DiaryNew, DiaryUpdate },
  {
    initialRouteName: "TodayIndex",
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
);

export default Today;
