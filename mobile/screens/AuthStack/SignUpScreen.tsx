import { useState } from "react";
import { Button, Input } from "react-native-magnus";

const SignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
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
    </>
  );
};

export default SignUpScreen;
