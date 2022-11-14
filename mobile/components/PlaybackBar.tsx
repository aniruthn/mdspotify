import { View } from "react-native";
import { Text } from "react-native-magnus";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFirstFromQueue,
  togglePlayPauseActiveSong,
} from "../redux/songQueue/songQueueSlice";
import { RootState } from "../redux/store";

const PlaybackBar = () => {
  const playing = useSelector(
    (state: RootState) => state.songQueue.activeSongState
  );
  const queue = useSelector((state: RootState) => state.songQueue.queue);
  const dispatch = useDispatch();
  return (
    <View
      style={{
        position: "absolute",
        bottom: 80,
        marginLeft: "auto",
        marginRight: "auto",
        left: "10%",
        right: "10%",
        backgroundColor: "#7C7C7D",
        width: "80%",
        padding: 10,
        borderRadius: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text>{queue.length > 0 ? queue[0].title : "No song selected"}</Text>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Ionicons
          onPress={() => dispatch(togglePlayPauseActiveSong())}
          name={`${playing === "playing" ? "pause" : "play"}-outline`}
          size={20}
        />
        <Ionicons
          onPress={() => dispatch(removeFirstFromQueue())}
          name="play-skip-forward-outline"
          size={20}
        />
      </View>
    </View>
  );
};

export default PlaybackBar;
