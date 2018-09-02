import { AuthLoading, Home, SignIn, Profile } from "./screens";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import { Today } from "./stacks";

const App = createStackNavigator({ Home, Profile, Today });
const Auth = createStackNavigator({ SignIn });

// const Homm = createStackNavigator({});

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
