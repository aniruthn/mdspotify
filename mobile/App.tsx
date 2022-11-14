import {
  DarkTheme as DefaultDarkTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { ThemeProvider } from "react-native-magnus";
import EntryHandler from "./screens/EntryHandler";
import { ThemeType } from "react-native-magnus";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useEffect } from "react";
import { Audio } from "expo-av";

const ReactNavigationDarkTheme = {
  ...DefaultDarkTheme,
};

const MagnusDarkTheme: ThemeType = {
  name: "dark",
  components: {
    Text: {
      color: ReactNavigationDarkTheme.colors.text,
    },
    Input: {
      color: ReactNavigationDarkTheme.colors.text,
      bg: ReactNavigationDarkTheme.colors.background,
    },
  },
};

export default function App() {
  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: true,
    });
  });
  return (
    <Provider store={store}>
      <NavigationContainer theme={ReactNavigationDarkTheme}>
        <ThemeProvider theme={MagnusDarkTheme}>
          <EntryHandler />
        </ThemeProvider>
      </NavigationContainer>
    </Provider>
  );
}
