import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgotPassword from './ForgotPassword'
const Stack = createNativeStackNavigator();
import HomeStack from "../homescreen/index";
import LogIn from "./Login";
import { NavigationContainer } from "@react-navigation/native";
function SignupStack() {
  return (
     <NavigationContainer independent={true}>
    <Stack.Navigator
      screenOptions={{
        headerShown: false, gesturesEnabled: false,
      }}>
      <Stack.Screen name="LogIn" component={LogIn} initialRouteName={LogIn} />
     <Stack.Screen name="Home" component={HomeStack}/>
      <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
    </Stack.Navigator>
     </NavigationContainer>
  );
}

export default SignupStack;
