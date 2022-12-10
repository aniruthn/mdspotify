import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Button, Input, Text } from "react-native-magnus";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthStackParamList } from "./AuthStackNavigator";

type Props = NativeStackScreenProps<AuthStackParamList, "SignUpScreen">;

const SignUpScreen = ({ navigation }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <SafeAreaView>
      <Text>MDSpotify</Text>
      <Input
        placeholder="username"
        p={10}
        focusBorderColor="blue700"
        borderColor="gray500"
        value={username}
        onChangeText={setUsername}
        autoCorrect={false}
      />
      <Input
        placeholder="password"
        secureTextEntry
        p={10}
        focusBorderColor="blue700"
        borderColor="gray500"
        value={password}
        onChangeText={setPassword}
        autoCorrect={false}
      />
      <Button>Sign Up</Button>
      <Button onPress={() => navigation.navigate("SignInScreen")}>
        Sign In
      </Button>
    </SafeAreaView>
  );
};

export default SignUpScreen;
