import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Button, Input, Text } from "react-native-magnus";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { BaseURL } from "../../constants";
import { logIn, setUserData } from "../../redux/user/userSlice";
import { AuthStackParamList } from "./AuthStackNavigator";

type Props = NativeStackScreenProps<AuthStackParamList, "SignUpScreen">;

const SignUpScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const signUpHandler = async () => {
    if (!username || !password) {
      return;
    }
    const url = new URL(`${BaseURL}/auth/createUser`);
    url.searchParams.append("username", username);
    url.searchParams.append("password", password);
    try {
      const response = await fetch(url.toString());
      const data = await response.json();
      if (Object.keys(data).length > 0) {
        dispatch(setUserData(data));
        dispatch(logIn());
        console.log("Signed In");
      } else {
        console.log("Signed In Failed");
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
      <Button onPress={signUpHandler}>Sign Up</Button>
      <Button onPress={() => navigation.navigate("SignInScreen")}>
        Sign In
      </Button>
    </SafeAreaView>
  );
};

export default SignUpScreen;
