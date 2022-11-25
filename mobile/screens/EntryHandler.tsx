import RootTabNavigator from "./RootTab/RootTabNavigator";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import AuthStackNavigator from "./AuthStack/AuthStackNavigator";

const EntryHandler = () => {
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
  return loggedIn ? <RootTabNavigator /> : <AuthStackNavigator />;
};

export default EntryHandler;
