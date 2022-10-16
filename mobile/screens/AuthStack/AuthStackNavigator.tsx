import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";

const AuthStack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  const options = { headerShown: false };
  return (
    <AuthStack.Navigator screenOptions={options}>
      <AuthStack.Screen name="Sign In" component={SignInScreen} />
      <AuthStack.Screen name="Sign Up" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
