import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";

export type AuthStackParamList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  const options = { headerShown: false };
  return (
    <AuthStack.Navigator screenOptions={options}>
      <AuthStack.Screen name="SignInScreen" component={SignInScreen} />
      <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
