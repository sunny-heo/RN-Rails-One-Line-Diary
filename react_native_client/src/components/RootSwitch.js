import { AuthLoading, Home, SignIn, Profile } from "./screens";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";

const App = createStackNavigator({ Home, Profile });
const Auth = createStackNavigator({ SignIn });

export default createSwitchNavigator(
  {
    AuthLoading,
    App,
    Auth
  },
  {
    initialRouteName: "AuthLoading"
  }
);
