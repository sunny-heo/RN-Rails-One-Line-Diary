import { createStackNavigator } from "react-navigation";
import { FriendHome } from "../presentations";

const Friend = createStackNavigator(
  { FriendHome },
  {
    initialRouteName: "FriendHome",
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
);

export default Friend;
