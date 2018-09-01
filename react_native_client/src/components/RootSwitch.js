import { Home, SignIn, AuthLoading } from "./screens";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";

const App = createStackNavigator({ Home });
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
