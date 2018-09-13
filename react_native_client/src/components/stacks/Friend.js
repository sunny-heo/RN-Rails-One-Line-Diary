import { createStackNavigator } from "react-navigation";
import { FriendHome, FriendRequestIndex } from "../presentations";

const Friend = createStackNavigator(
  { FriendHome, FriendRequestIndex },
  {
    initialRouteName: "FriendHome",
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
);

export default Friend;
