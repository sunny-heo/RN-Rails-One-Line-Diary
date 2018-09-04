import { createStackNavigator } from "react-navigation";
import { TodayIndex, TodayDiary, DiaryNew } from "../presentations";

const Today = createStackNavigator(
  { TodayIndex, TodayDiary, DiaryNew },
  {
    initialRouteName: "TodayIndex",
    mode: "modal",
    headerMode: "none",
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
);

export default Today;
