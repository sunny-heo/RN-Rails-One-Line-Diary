import { Home, SignIn } from "./screens";
import { createStackNavigator } from "react-navigation";

export default createStackNavigator(
  {
    Home,
    SignIn
  },
  {
    initialRouteName: "Home"
  }
);
