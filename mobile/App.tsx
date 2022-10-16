import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "react-native-magnus";
import EntryHandler from "./screens/EntryHandler";

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <EntryHandler />
      </ThemeProvider>
    </NavigationContainer>
  );
}
