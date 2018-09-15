import { AuthLoading, Home, SignIn, Profile } from "./screens";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import { Today, Friend } from "./stacks";
import { FriendNew } from "./presentations";

const App = createStackNavigator({ Home, Profile, Today, Friend });
const Auth = createStackNavigator({ SignIn });

export default createSwitchNavigator(
  {
    AuthLoading,
    App,
    Auth,
    FriendNew
  },
  {
    // initialRouteName: "AuthLoading"
    initialRouteName: "FriendNew"
  }
);
