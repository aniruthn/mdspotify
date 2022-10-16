import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";

export type RootTabParamList = {
  Home: undefined;
};

const RootTab = createBottomTabNavigator<RootTabParamList>();

const RootTabNavigator = () => {
  return (
    <RootTab.Navigator initialRouteName="Home">
      <RootTab.Screen name="Home" component={HomeScreen} />
    </RootTab.Navigator>
  );
};

export default RootTabNavigator;
