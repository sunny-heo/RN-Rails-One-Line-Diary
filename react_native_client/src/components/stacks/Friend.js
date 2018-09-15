import { createStackNavigator } from "react-navigation";
import { FriendHome, FriendNew, FriendProfile } from "../presentations";

const Friend = createStackNavigator(
  { FriendHome, FriendNew, FriendProfile },
  {
    initialRouteName: "FriendHome",
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
);

export default Friend;
