import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack=createNativeStackNavigator();
import MoveOut from "./MoveOut";

function MoveOutStack() {
  return (

    <Stack.Navigator screenOptions={{headerShown:false,gesturesEnabled:false}}>
      <Stack.Screen name="MoveOut" component={MoveOut} initialRouteName={MoveOut}/>
    </Stack.Navigator>

  );
}
export default MoveOutStack;
