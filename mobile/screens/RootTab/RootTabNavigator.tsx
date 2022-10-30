import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import LibraryScreen from "./LibraryScreen";
import SearchScreen from "./SearchScreen";

export type RootTabParamList = {
  Home: undefined;
  Search: undefined;
  Library: undefined;
};

const RootTab = createBottomTabNavigator<RootTabParamList>();

const RootTabNavigator = () => {
  return (
    <RootTab.Navigator initialRouteName="Home">
      <RootTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <RootTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />
      <RootTab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarLabel: "Library",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library-outline" size={size} color={color} />
          ),
        }}
      />
    </RootTab.Navigator>
  );
};

export default RootTabNavigator;
