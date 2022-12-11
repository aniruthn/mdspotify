import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import { Button, Input, Text } from "react-native-magnus";
import { useDispatch } from "react-redux";
import { BaseURL } from "../../constants";
import { logIn, setUserData } from "../../redux/user/userSlice";
import { AuthStackParamList } from "./AuthStackNavigator";

type Props = NativeStackScreenProps<AuthStackParamList, "SignInScreen">;

const SignInScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const signInHandler = async () => {
    if (!username || !password) {
      return;
    }
    const url = new URL(`${BaseURL}/auth/signin`);
    url.searchParams.append("username", username);
    url.searchParams.append("password", password);
    try {
      const response = await fetch(url.toString());
      const data = await response.json();
      if (Object.keys(data).length > 0) {
        dispatch(setUserData(data));
        dispatch(logIn());
        console.log("Signed Up");
      } else {
        console.log("Sign Up Failed");
      }
    } catch (error: any) {
      console.error(error.toString());
    }
  };
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
        autoCapitalize="none"
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
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Button onPress={signInHandler}>Sign In</Button>
      <Button onPress={() => navigation.navigate("SignUpScreen")}>
        Sign Up
      </Button>
    </SafeAreaView>
  );
};

export default SignInScreen;
