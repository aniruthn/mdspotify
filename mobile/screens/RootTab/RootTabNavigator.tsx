import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import LibraryScreen from "./LibraryScreen";
import SearchScreen from "./SearchScreen";
import PlaybackBar from "../../components/PlaybackBar";
import { Audio } from "expo-av";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";

export type RootTabParamList = {
  Home: undefined;
  Search: undefined;
  Library: undefined;
};

const RootTab = createBottomTabNavigator<RootTabParamList>();

const RootTabNavigator = () => {
  const playing = useSelector(
    (state: RootState) => state.songQueue.activeSongState
  );
  const queue = useSelector((state: RootState) => state.songQueue.queue);
  const [sound, setSound] = useState(new Audio.Sound());

  useEffect(() => {
    if (queue.length !== 0) {
      console.log(queue);
      (async () => {
        try {
          await sound.unloadAsync();
          await sound.loadAsync(
            {
              uri: "http://localhost:8080/playback/" + queue[0].uuid,
            },
            { volume: 1 }
          );
        } catch (error: any) {
          console.error(error.toString());
        }
      })();
    }
  }, [queue]);
  if (playing === "playing") sound?.playAsync();
  if (playing === "paused") sound?.pauseAsync();
  return (
    <>
      <RootTab.Navigator initialRouteName="Home">
        <RootTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <RootTab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search-outline" size={size} color={color} />
            ),
          }}
        />
        <RootTab.Screen
          name="Library"
          component={LibraryScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="library-outline" size={size} color={color} />
            ),
          }}
        />
      </RootTab.Navigator>
      <PlaybackBar />
    </>
  );
};

export default RootTabNavigator;
