import { createStackNavigator } from "react-navigation";
import { FriendHome, FriendProfile } from "../presentations";

const Friend = createStackNavigator(
  { FriendHome, FriendProfile },
  {
    initialRouteName: "FriendHome",
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
);

export default Friend;
