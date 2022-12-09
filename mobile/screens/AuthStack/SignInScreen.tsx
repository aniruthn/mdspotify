import { useState } from "react";
import { SafeAreaView } from "react-native";
import { Button, Input } from "react-native-magnus";
import { useDispatch } from "react-redux";
import { BaseURL } from "../../constants";
import { logIn, setUserData } from "../../redux/user/userSlice";

const SignInScreen = () => {
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
      }
    } catch (error: any) {
      console.log(error.toString());
    }
  };
  return (
    <SafeAreaView>
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
    </SafeAreaView>
  );
};

export default SignInScreen;
