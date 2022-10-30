import {
  DarkTheme as DefaultDarkTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { ThemeProvider } from "react-native-magnus";
import EntryHandler from "./screens/EntryHandler";

const DarkTheme = {
  ...DefaultDarkTheme,
};

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <ThemeProvider>
        <EntryHandler />
      </ThemeProvider>
    </NavigationContainer>
  );
}
